import { pool } from "../db.js";
import { busquedaIdUser } from "../libs/BusquedaIdUser.js";

export const getProvedores = async (req, res) => {
  try {
    const { user } = req;
    const idUsuarios = await busquedaIdUser(user.Username);
    const proveedores = await pool.query("SELECT * FROM proveedores WHERE idUsuarios = ?",[idUsuarios]);
    res.send(proveedores[0]);
  } catch (error) {
    res.status(500).json({ 
      error: true,
      message: "Ocurrio un error al traer los proveedores",
      details: error.message
     });
    console.log({ error: error.message });
  }
};

export const createProvedores = async (req, res) => {
  try {
    const { CUIT, Nombre, Correo, Domicilio } = req.body;
    const { user } = req;
    const idUsuarios = await busquedaIdUser(user.Username);
    const query =
      "INSERT INTO proveedores (CUIT, Nombre, Correo, Domicilio,idUsuarios ) VALUES (?,?,?,?,?)";
    const values = [CUIT, Nombre, Correo, Domicilio,idUsuarios];
    const [result] = await pool.query(query, values);
    const newProveedor = {
      idProveedores: result.insertId,
      CUIT,
      Nombre,
      Correo,
      Domicilio,
      idUsuarios
    };
    res.status(201).json(newProveedor);
  } catch (error) {
    res.status(500).json({ 
      error: true,
      message: "Ocurrio un error al crear un proveedor",
      details: error.message
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
      details: error.message
     });
    console.log({ error: error.message });
  }
};

export const updateProvedores = async (req, res) => {
  try {
    const { id } = req.params;
    const { CUIT, Nombre, Correo, Domicilio } = req.body;
    const query =
      "UPDATE proveedores SET CUIT = ?, Nombre = ?, Correo = ?, Domicilio = ? WHERE idProveedores = ?";
    const values = [CUIT, Nombre, Correo, Domicilio, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se contro el cliente a actualizar" });
    }

    // Haremos un select para que nos devuelta el cliente actualizado
    const [rowsSelect] = await pool.query(
      "SELECT * FROM proveedores WHERE idProveedores = ?",
      [id]
    );
    console.log(rowsSelect[0]);
    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ 
      error: true,
      message: "Ocurrio un error al editar un proveedor",
      details: error.message
     });
    console.log({ error: error.message });
  }
};

export const deleteProvedores = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM proveedores WHERE idProveedores = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se encontro el Proveedor a eliminar" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ 
      error: true,
      message: "Ocurrio un error al eliminar un proveedor",
      details: error.message
     });
    console.log({ error: error.message });
  }
};
