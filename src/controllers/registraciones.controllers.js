import { pool } from "../db.js";
import { modificarStockVentaTransaction } from "../libs/modificarStock.js";
import { formatearFechas } from "../libs/formatearFechas.js";
import { busquedaIdUser } from "../libs/BusquedaIdUser.js";
import { sumarTotales } from "../helpers/SumarTotalVentas.js";
import { generarNumeroFactura } from "../helpers/GenerarNumeroFactura.js";
import { fechaLocal } from "../helpers/fechaLocal.js";
import Big from "big.js";

export const getRegistraciones = async (req, res) => {
  try {
    const { user } = req;
    const idUsuarios = await busquedaIdUser(user.Username);
    const registraciones = await pool.query(
      "SELECT * FROM registraciones WHERE idUsuarios = ?",
      [idUsuarios]
    );
    res.send(registraciones[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
    console.log("Error en getRegistraciones");
  }
};

export const getIdRegistraciones = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
    SELECT 
    r.*, 
    c.CUIT, 
    c.Nombre, 
    c.Apellido
    FROM registraciones r
    LEFT JOIN clientes c ON r.idClientes = c.idClientes
    WHERE r.idRegistraciones = ?
    `;
    const [rows] = await pool.query(query, [id]);
    if (rows.length <= 0) {
      res.status(404).json({ message: "No se encontro la venta" });
    }
    res.send(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const getRegistracionesDetalles = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que id es un número
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const query = `
    SELECT p.Descripcion, r.Fecha, r.Total,
	    dr.precioUniCosto, dr.PrecioUni, dr.Cantidad, dr.totalCosto, dr.Total, dr.idRegistraciones, dr.idDetalleRegistraciones
      FROM registraciones r
      JOIN detalle_registraciones dr ON dr.idRegistraciones = r.idRegistraciones
      JOIN productos p ON dr.idProductos = p.idProductos
      WHERE dr.idRegistraciones = ?;
    `;

    const [rows] = await pool.query(query, [id]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "No existe la venta" });
    }

    return res.json(rows);
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

export const crearRegistraciones = async (req, res) => {
  try {
    const { ventas, idClientes } = req.body;

    const { user } = req;

    if (!Array.isArray(ventas) || ventas.length === 0) {
      throw new Error("El cuerpo de la solicitud debe ser un array de ventas");
    }

    const conn = await pool.getConnection();
    await conn.beginTransaction();
    const numeroFactura = generarNumeroFactura();
    const { idProductos } = ventas[0];

    const { Total, TotalCosto } = sumarTotales(ventas);
    const { HoyfechaLocal: Fecha } = fechaLocal();

    const query = `
    INSERT INTO registraciones (NFactura, Fecha, totalCosto, Total, idClientes, idProductos, idUsuarios) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      numeroFactura,
      Fecha,
      TotalCosto,
      Total,
      idClientes,
      idProductos,
      user.idUsuarios,
    ];

    const [resultRegistraciones] = await conn.query(query, values);
    const idRegistraciones = resultRegistraciones.insertId;

    const queries = ventas.map(async (venta) => {
      const { Cantidad, precioCosto, Precio, idProductos } = venta;
      const queryDetalleRegistraciones = `
        INSERT INTO detalle_registraciones (Fecha, precioUniCosto, PrecioUni, Cantidad,totalCosto, Total, idProductos, idRegistraciones, idClientes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const precioCostoBig = new Big(precioCosto);
      const precioBig = new Big(Precio);
      const cantidadBig = new Big(Cantidad);
      const totalCostoDetalles = precioCostoBig.times(cantidadBig);
      const TotalDetalles = precioBig.times(cantidadBig);
      const values = [
        Fecha,
        precioCosto.toString(),
        Precio.toString(),
        cantidadBig.toString(),
        totalCostoDetalles.toString(),
        TotalDetalles.toString(),
        idProductos,
        idRegistraciones,
        idClientes,
      ];
      await Promise.all([
        await conn.query(queryDetalleRegistraciones, values),
        modificarStockVentaTransaction(
          idProductos,
          cantidadBig.toString(),
          conn
        ),
      ]);
    });

    const newRegistracion = {
      idRegistraciones,
      numeroFactura,
      Fecha,
      TotalCosto,
      Total,
      idClientes,
      idProductos,
      idUsuarios: user.idUsuarios,
    };

    await Promise.all(queries);
    await conn.commit();
    conn.release();

    return res.status(200).json({
      status: "OK",
      message: "Venta registrada",
      idRegistraciones: resultRegistraciones.insertId,
      NFactura: numeroFactura,
      data: newRegistracion,
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto: error,
      message: "Error en crearRegistarciones Back",
    });
  }
};

export const updateRegistraciones = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Fecha,
      Producto,
      PrecioU,
      Cantidad,
      Total,
      idClientes,
      idProductos,
    } = req.body;
    const query = `
            UPDATE registraciones SET Fecha = ?, Producto = ?, PrecioU = ?, Cantidad = ?, 
            Total = ?, idClientes = ?, idProductos = ? WHERE idRegistraciones = ?
        `;
    const values = [
      Fecha,
      Producto,
      PrecioU,
      Cantidad,
      Total,
      idClientes,
      idProductos,
      id,
    ];
    const [rows] = await pool.query(query, values);
    if (rows.affectedRows === 0) {
      res
        .status(404)
        .json({ message: "No se encontro el registro a actualizar" });
    }

    const [rowsSelect] = await pool.query(
      "SELECT * FROM Registraciones WHERE idRegistraciones = ?",
      [id]
    );
    res.send(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const deleteRegistraciones = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM registraciones WHERE idRegistraciones = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      res
        .status(404)
        .json({ message: "No se encontro el registro a eliminar" });
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};
