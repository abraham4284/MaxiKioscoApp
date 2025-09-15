import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export const createAccesToken = (usuario) => {
  try {
    return jwt.sign(usuario, TOKEN_SECRET);
  } catch (error) {
    console.log("Error en la creacion del token", error.message);
  }
};
