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
    // const query = `
    // SELECT  Registraciones.NFactura, Registraciones.Fecha, Registraciones.Total, Clientes.Apellido, Clientes.Nombre, Clientes.idClientes
    // FROM registraciones
    // JOIN Clientes ON Clientes.idClientes = registraciones.idClientes
    // WHERE Registraciones.idRegistraciones = ?;
    // `;
    const query = `
    SELECT * FROM registraciones WHERE idRegistraciones = ?
    `
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
    SELECT  productos.Descripcion, registraciones.Fecha, registraciones.Total,
    detalle_registraciones.PrecioUni, detalle_registraciones.Cantidad,detalle_registraciones.Total, detalle_registraciones.idRegistraciones,
    detalle_registraciones.idDetalleRegistraciones
    FROM registraciones
    JOIN detalle_registraciones ON detalle_registraciones.idRegistraciones = registraciones.idRegistraciones
    JOIN productos ON detalle_registraciones.idProductos = productos.idProductos
    WHERE detalle_registraciones.idRegistraciones = ?;

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
    if (!Array.isArray(ventas) || ventas.length === 0) {
      throw new Error("El cuerpo de la solicitud debe ser un array de ventas");
    }

    const { user } = req;
    const idUsuarios = await busquedaIdUser(user.Username);
    const numeroFactura = generarNumeroFactura();
    const { idClientes, idProductos } = ventas[0];

    const { Total } = sumarTotales(ventas);
    const Fecha = formatearFechas(new Date());

    const query = `
    INSERT INTO registraciones (NFactura, Fecha, Total, idClientes, idProductos, idUsuarios) 
    VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      numeroFactura,
      Fecha,
      Total,
      idClientes,
      idProductos,
      idUsuarios,
    ];

    const [resultRegistraciones] = await pool.query(query, values);
    const idRegistraciones = resultRegistraciones.insertId;

    const queries = ventas.map(async (venta) => {
      const { PrecioU, Cantidad, idProductos } = venta;
      console.log(venta, "Data venta map");
      const queryDetalleRegistraciones = `
        INSERT INTO detalle_registraciones (Fecha, PrecioUni, Cantidad, Total, idProductos, idRegistraciones, idClientes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const TotalDetalles = PrecioU * Cantidad
      const values = [
        Fecha,
        PrecioU,
        Cantidad,
        TotalDetalles,
        idProductos,
        idRegistraciones,
        idClientes,
      ];
      await pool.query(queryDetalleRegistraciones, values);
    });

    await Promise.all(queries);

    await Promise.all(
      ventas.map((venta) =>
        modificarStockVenta(venta.idProductos, venta.Cantidad)
      )
    );

    res.json({
      message: "Venta registrada"
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message, mesagge: "Soy el error" });
    console.log("Error en crearRegistraciones");
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