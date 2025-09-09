import { pool } from "../db.js";
import { busquedaIdUser } from "../libs/BusquedaIdUser.js";

export const getClientes = async (req, res) => {
  try {
    const { user } = req;
    const idUsuarios = await busquedaIdUser(user.Username);
    const clientes = await pool.query(
      "SELECT * FROM clientes WHERE idUsuarios = ?",
      [idUsuarios]
    );
    res.send(clientes[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const createClientes = async (req, res) => {
  try {
    const { CUIT, Nombre, Apellido, Correo, Domicilio } = req.body;
    if (Nombre === "" || Apellido === "") {
      return res.status(422).json({
        status: "ERROR",
        message: "El nombre y el apellido no pueden venir vacios",
      });
    }
    const { user } = req;
    const query =
      "INSERT INTO clientes (CUIT, Nombre, Apellido, Correo, Domicilio, idUsuarios) VALUES (?,?,?,?,?,?)";
    const values = [CUIT, Nombre, Apellido, Correo, Domicilio, user.idUsuarios];
    const [result] = await pool.query(query, values);
    if (result.affectedRows === 0) {
      return res.status(500).json({
        status: "ERROR",
        message: "Error al crear el cliente",
      });
    }

    const newCliente = {
      idClientes: result.insertId,
      CUIT,
      Nombre,
      Apellido,
      Correo,
      Domicilio,
    };

    res.status(201).json({
      status: "OK",
      message: "Cliente creado correctamente",
      data: newCliente,
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const getIdClientes = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM clientes WHERE idClientes = ?";
    const [rows] = await pool.query(query, [id]);

    if (rows.length <= 0) {
      res.status(203).json("Consumidor Final");
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const getClientByDNI = async (req, res) => {
  try {
    const { CUIT } = req.params;
    const query = "SELECT * FROM clientes WHERE CUIT = ?";
    const [rows] = await pool.query(query, [CUIT]);
    if (rows.length <= 0) {
      res.status(404).json({ message: "No existe el cliente" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
    console.log("Error en la busqueda de cliente por DNI");
  }
};

export const updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { CUIT, Nombre, Apellido, Correo, Domicilio } = req.body;
    if (Nombre === "" || Apellido === "") {
      return res.status(422).json({
        status: "ERROR",
        message: "El nombre y el apellido no pueden venir vacios",
      });
    }
    const query =
      "UPDATE clientes SET CUIT = ?, Nombre = ?, Apellido = ?, Correo = ?, Domicilio = ? WHERE idClientes = ?";
    const values = [CUIT, Nombre, Apellido, Correo, Domicilio, id];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      res.status(500).json({
        status: "ERROR",
        message: "No se contro el cliente a actualizar",
      });
    }

    // Haremos un select para que nos devuelta el cliente actualizado
    const [rowsSelect] = await pool.query(
      "SELECT * FROM clientes WHERE idClientes = ?",
      [id]
    );

    if (rowsSelect[0].length === 0) {
      res.status(500).json({
        status: "ERROR",
        message: "No se contro el cliente",
      });
    }

    return res.status(200).json({
      status: "OK",
      message: "Cliente actualizado correctamente",
      data: rowsSelect[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};

export const deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM clientes WHERE idClientes = ?";
    const [rows] = await pool.query(query, [id]);
    if (rows.affectedRows === 0) {
      res.status(404).json({ error: "No se encontro el cliente a eliminar" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log({ error: error.message });
  }
};
