import { pool } from "../db.js";
import { busquedaIdUser } from "../libs/BusquedaIdUser.js";

export const getProvedores = async (req, res) => {
  try {
    const { user } = req;
    const query = `
     SELECT 
    p.*, 
    CASE 
        WHEN pr.idProveedores IS NOT NULL THEN 'SI'
        ELSE 'NO'
    END AS tieneProducto
    FROM proveedores p
    LEFT JOIN productos pr
    ON p.idProveedores = pr.idProveedores
    WHERE p.idUsuarios = 25
    GROUP BY p.idProveedores
    `;
    const proveedores = await pool.query(query, [user.idUsuarios]);
    res.send(proveedores[0]);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Ocurrio un error al traer los proveedores",
      details: error.message,
    });
    console.log({ error: error.message });
  }
};

export const createProvedores = async (req, res) => {
  try {
    const { CUIT, Nombre, Correo, Domicilio } = req.body;
    if (Nombre === "") {
      return res.status(422).json({
        status: "ERROR",
        message: "El nombre no puede venir vacio",
      });
    }
    const { user } = req;
    const idUsuarios = user.idUsuarios;

    const query =
      "INSERT INTO proveedores (CUIT, Nombre, Correo, Domicilio,idUsuarios ) VALUES (?,?,?,?,?)";
    const values = [CUIT, Nombre, Correo, Domicilio, idUsuarios];
    const [result] = await pool.query(query, values);
    if (result.affectedRows === 0) {
      return res.status(422).json({
        status: "ERROR",
        message: "Error al crear un proveedor",
      });
    }
    const newProveedor = {
      idProveedores: result.insertId,
      CUIT,
      Nombre,
      Correo,
      Domicilio,
      idUsuarios,
    };
    return res.status(200).json({
      status: "OK",
      message: "Proveedor creado correctamente",
      data: newProveedor,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Ocurrio un error al crear un proveedor",
      details: error.message,
    });
    console.log({ error: error.message });
  }
};

export const getProvedorestId = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM proveedores WHERE idProveedores = ?";
    const [rows] = await pool.query(query, [id]);

    if (rows.length <= 0) {
      res.status(404).json({ message: "No existe el cliente" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Ocurrio un error al traer un proveedor en particular",
      details: error.message,
    });
    console.log({ error: error.message });
  }
};

export const updateProvedores = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        status: "ERROR",
        message: "El id es obligatorio",
      });
    }
    const { CUIT, Nombre, Correo, Domicilio } = req.body;
    if (Nombre === "") {
      return res.status(422).json({
        status: "ERROR",
        message: "El nombre no puede venir vacio",
      });
    }
    const query =
      "UPDATE proveedores SET CUIT = ?, Nombre = ?, Correo = ?, Domicilio = ? WHERE idProveedores = ?";
    const values = [CUIT, Nombre, Correo, Domicilio, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      res.status(404).json({
        status: "ERROR",
        message: "No se contro el cliente a actualizar",
      });
    }

    // Haremos un select para que nos devuelta el cliente actualizado
    const [rowsSelect] = await pool.query(
      "SELECT * FROM proveedores WHERE idProveedores = ?",
      [id]
    );
    if (rowsSelect[0].length === 0) {
      res.status(404).json({
        status: "ERROR",
        message: "Error al obtener el proveedor",
      });
    }

    return res.status(200).json({
      status: "OK",
      message: "Proveedor actualizado correctamente",
      data: rowsSelect[0],
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Ocurrio un error al editar un proveedor",
      details: error.message,
    });
    console.log({ error: error.message });
  }
};

export const deleteProvedores = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        status: "ERROR",
        message: "El id es obligatorio",
      });
    }
    const query = "DELETE FROM proveedores WHERE idProveedores = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      res.status(404).json({
        status: "ERROR",
        message:
          "No se puede eliminar el proveedor ya que esta asociado a algun registro de productos",
      });
    }
    return res.status(200).json({
      status: "OK",
      message: "Proveedor eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Ocurrio un error al eliminar un proveedor",
      details: error.message,
    });
    console.log({ error: error.message });
  }
};
