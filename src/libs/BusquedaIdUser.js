import { pool } from "../db.js";

export const busquedaIdUser = async (data) => {
  try {
    const busqueda = "SELECT * FROM usuarios WHERE Username = ?";
    const userEncontrado = await pool.query(busqueda, [data]);
    const { idUsuarios } = userEncontrado[0][0];
    return idUsuarios;
  } catch (error) {
    console.log(error);
    console.log("Error en en el idUsaurio");
  }
};
