import { pool } from "../db.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAccesToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { Username, Password, img } = req.body;
  console.log(img, "img_URL");
  const hashedPassword = await bycrypt.hash(Password, 10);
  // Creamos la conexion
  const conection = await pool.getConnection();

  try {
    // if(Username.length < 4 || Password.length < 4) return res.status(404).json({message:'No se puede ingresar menos de 4 caracteres'});
    //Chqueamos si el usuario existe
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE Username = ?",
      [Username]
    );
    if (rows.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }
    // Creamos el registro
    const [result] = await pool.query(
      "INSERT INTO usuarios (Username,Password,img) VALUES (?,?,?)",
      [Username, hashedPassword, img]
    )


    // Liberamos la conexion
    pool.releaseConnection(conection);

    // Creamos el token

    const data = {
      idUsuarios: result.insertId,
      Username: Username,
      img: img,
    };
    const token = createAccesToken(data);

    // Guardamos los cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60,
    });
    console.log(token, "Token registro");
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({ error: error.message });
    console.log("Error de la funcion Register");
  }
};

export const login = async (req, res) => {
  const { Username, Password } = req.body;
  try {
    //Creamos la conexion
    //const conection = await pool.getConnection();

    // Validamos si el usuario ya existe
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE Username = ?",
      [Username]
    );
    console.log(rows[0], "Soy el undefained");
    if (rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectas" });
    }
    // Validamos la contraseña
    const storePassword = rows[0].Password;
    const validPassword = await bycrypt.compare(Password, storePassword);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectas" });
    }

    const data = {
      idUsuarios: rows[0].idUsuarios,
      Username: Username,
      img: rows[0].img,
    };

    // Creamos nuevamente el token de acceso
    const token = createAccesToken(data);
    console.log(token, "token de login");
    // Creamos el logeo
    await pool.query("INSERT INTO login (idUsuarios,Token) VALUES (?,?)", [
      rows[0].idUsuarios,
      token,
    ]);

    // Liberamos la conexion
    //pool.releaseConnection(conection);
    // Guardamos la cookies para el navegador
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60,
    });
    res.status(201).json(data);
    //Creamos la conexion
  } catch (error) {
    res
      .status(500)
      .json({ error: "error en el servidor", details: error.message });
    console.log({ error: error.message });
    console.log("Error de la funcion login");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('token',{
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    })
    return res.status(200).json({ message: "Se cerro la sesion" });
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({ error: error.message });
    console.log("Error de la funcion logout");
  }
};

export const getUsernameUsuarios = async (req, res) => {
  try {
    const { Username } = req.params;
    const query = `
      SELECT * FROM usuarios WHERE Username = ?
      `;
    const [rows] = await pool.query(query, [Username]);

    if (rows.length <= 0) {
      res.status(404).json({ message: "No existe el cliente" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({ error: error.message });
    console.log("Error de la funcion getIdUsuarios");
  }
};

export const updateUsuarios = async (req, res) => {
  try {
    const { Username, Password, img } = req.body;
    const updateHashedPassword = await bycrypt.hash(Password, 10); // Corrección en la importación de bcrypt
    const { id } = req.params;

    // Buscar el usuario por id
    const userFound = await pool.query(
      "SELECT * FROM usuarios WHERE idUsuarios = ?",
      [id]
    );
    let passwordFound = userFound[0][0].Password;

    // Definir la consulta para la actualización
    const query = `
      UPDATE usuarios SET Username = ?, Password = ?, img = ? WHERE idUsuarios = ?
    `;

    let values;

    // Comparar la contraseña y decidir si encriptar la nueva
    if (Password === passwordFound) {
      values = [Username, Password, img, id];
    } else {
      values = [Username, updateHashedPassword, img, id];
    }

    // Ejecutar la consulta
    const [rows] = await pool.query(query, values);

    if (rows.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró el usuario a actualizar" });
    }

    // Retornar el usuario actualizado
    const [rowsSelect] = await pool.query(
      "SELECT * FROM usuarios WHERE idUsuarios = ?",
      [id]
    );

    res.json(rowsSelect[0]);
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
    console.log({ error: error.message });
    console.log("Error de la función updateUsuarios");
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No autorizado" });

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.status(401).json({ message: "No autorizado" });

      //Verificamos que si el token existe el usuario tmb
      const usuarioEncontrado = await pool.query(
        "SELECT * FROM usuarios WHERE Username = ?",
        [user.username]
      );

      if (!usuarioEncontrado)
        return res.status(401).json({ message: "No autorizado" });
      const data = {
        idUsuarios: user.idUsuarios,
        Username: user.Username,
        img: user.img,
      };
      return res.json(data);
    });
  } catch (error) {
    console.log({ error: error.message });
    console.log("Error en el verify de authControllers");
  }
};
