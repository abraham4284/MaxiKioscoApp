import { pool } from "../db.js";
import { modificarStockVenta } from "../libs/modificarStock.js";
import { formatearFechas } from "../libs/formatearFechas.js";
import { busquedaIdUser } from "../libs/BusquedaIdUser.js";
import { sumarTotales } from "../helpers/SumarTotalVentas.js";
import { generarNumeroFactura } from "../helpers/GenerarNumeroFactura.js";

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
    SELECT * FROM registraciones WHERE idRegistraciones = ?
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
    const ventas = req.body;
    const { user } = req
    console.log(ventas)
    if (!Array.isArray(ventas) || ventas.length === 0) {
      throw new Error("El cuerpo de la solicitud debe ser un array de ventas");
    }

    const numeroFactura = generarNumeroFactura();
    const { idClientes, idProductos } = ventas[0];

    const { Total, TotalCosto } = sumarTotales(ventas);
    const Fecha = formatearFechas(new Date());
    
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

    const [resultRegistraciones] = await pool.query(query, values);
    const idRegistraciones = resultRegistraciones.insertId;

    const queries = ventas.map(async (venta) => {
      const { Cantidad, precioCosto, Precio, idProductos } = venta;
      console.log(venta, "Data venta map");
      const queryDetalleRegistraciones = `
        INSERT INTO detalle_registraciones (Fecha, precioUniCosto, PrecioUni, Cantidad,totalCosto, Total, idProductos, idRegistraciones, idClientes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const totalCostoDetalles = precioCosto * Cantidad;
      const TotalDetalles = Precio * Cantidad;
      const values = [
        Fecha,
        precioCosto,
        Precio,
        Cantidad,
        totalCostoDetalles,
        TotalDetalles,
        idProductos,
        idRegistraciones,
        idClientes,
      ];
      await Promise.all([
        await pool.query(queryDetalleRegistraciones, values),
        modificarStockVenta(idProductos, Cantidad),
      ]);
    });

    await Promise.all(queries);

    res.json({
      message: "Venta registrada",
      idRegistraciones: resultRegistraciones.insertId,
      NFactura: numeroFactura,
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({
      error: error.message,
      errorCompleto : error,
      message: "Error en crearRegistarciones Back"
    })
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
