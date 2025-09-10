import { pool } from "../db.js";
import { formatearFechas } from "../libs/formatearFechas.js";

export const getNegocios = async (req, res) => {
  try {
    const { user } = req;
    const negocio = await pool.query(
      "SELECT * FROM negocios WHERE idUsuarios = ?",
      [user.idUsuarios]
    );

    if (negocio.length === 0) {
      res.json({
        status: 400,
        message: "No tiene ningun negocio a su nombre",
      });
    }
    res.send(negocio[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log(error);
  }
};

export const createNegocios = async (req, res) => {
  try {
    const { Nombre, Rubro, Descripcion, img } = req.body;
    if (!Nombre || !Rubro) {
      return res.status(422).json({
        status: "ERROR",
        message: "El nombre y el rubro es obligatorio",
      });
    }
    const { user } = req;
    const fecha = formatearFechas(new Date());

    const [negociosExistentes] = await pool.query(
      "SELECT * FROM negocios WHERE idUsuarios = ?",
      [user.idUsuarios]
    );

    if (negociosExistentes.length > 0) {
      return res.status(422).json({
        status: "ERROR",
        message:
          "Este usuario ya tiene un negocio asignado. No se pueden crear más.",
      });
    }

    const query =
      "INSERT INTO negocios (Nombre,Rubro,Descripcion,Fecha,img,idUsuarios) VALUES (?,?,?,?,?,?)";
    const values = [Nombre, Rubro, Descripcion, fecha, img, user.idUsuarios];

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(422).json({
        status: "ERROR",
        message: "Error al crear el negocio",
      });
    }

    const newNegocio = {
      idNegocios: result.insertId,
      Nombre,
      Rubro,
      Descripcion,
      img,
    };

    return res.status(200).json({
      status: "OK",
      message: "Negocio creado correctamente",
      data: newNegocio,
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log(error);
  }
};

export const updateNegocios = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Rubro, Descripcion, img, idUsuarios } = req.body;
    if (!Nombre || !Rubro || !idUsuarios) {
      return res.status(422).json({
        status: "ERROR",
        message: "El nombre, el idUsario y el rubro es obligatorio",
      });
    }
    const query = `
     UPDATE negocios SET Nombre = ?, Rubro = ?, Descripcion = ?, img = ?
     WHERE idNegocios = ?
    `;
    const values = [Nombre, Rubro, Descripcion, img, id, idUsuarios];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      res.status(422).json({
        status: "ERROR",
        message: "No se encontro el Negocio a actualizar",
      });
    }

    const [rowsSelect] = await pool.query(
      "SELECT * FROM negocios WHERE idNegocios = ?",
      [id]
    );

    return res.status(200).json({
      status: "OK",
      message: "Negocio actualizado correctamente",
      data: rowsSelect[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log(error);
  }
};
