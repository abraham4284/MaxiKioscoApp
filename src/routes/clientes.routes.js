import { Router } from "express";
import {
  getClientes,
  createClientes,
  getClientId,
  updateCliente,
  deleteCliente,
  getClientByDNI,
} from "../controllers/clientes.controllers.js";
import { authRequired } from "../middlewares/ValidarToken.js";

const router = Router();

router.get("/cliente", authRequired, getClientes);
// router.get("/cliente/:id", getClientId); // La comento pq me sirve mas la busqueda por DNI
router.get("/cliente/:CUIT",authRequired, getClientByDNI);

router.post("/cliente", authRequired,  createClientes);
router.put("/cliente/:id", authRequired, updateCliente);

router.delete("/cliente/:id", authRequired, deleteCliente);

export default router;
