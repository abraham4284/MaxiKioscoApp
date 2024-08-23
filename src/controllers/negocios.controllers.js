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
    const { user } = req;
    const fecha = formatearFechas(new Date());

    const query =
      "INSERT INTO negocios (Nombre,Rubro,Descripcion,Fecha,img,idUsuarios) VALUES (?,?,?,?,?,?)";
    const values = [Nombre, Rubro, Descripcion, fecha, img, user.idusuarios];

    await pool.query(query, values);

    res.send("Creado");
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log(error);
  }
};

export const updateNegocios = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Rubro, Descripcion, img, idUsuarios } = req.body;
    console.log(req.body, "Lo que llega del frontend");
    const query = `
     UPDATE negocios SET Nombre = ?, Rubro = ?, Descripcion = ?, img = ?
     WHERE idNegocios = ?
    `;
    const values = [Nombre, Rubro, Descripcion, img, id, idUsuarios];
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      res
        .status(404)
        .json({ message: "No se encontro el Negocio a actualizar" });
    }

    const [rowsSelect] = await pool.query(
      "SELECT * FROM negocios WHERE idNegocios = ?",
      [id]
    );

    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
    console.log(error);
  }
};
