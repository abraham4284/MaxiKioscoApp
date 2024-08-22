import { Router } from "express";
import {
  getProvedores,
  getProvedorestId,
  createProvedores,
  updateProvedores,
  deleteProvedores,
} from "../controllers/proveedores.controllers.js";
import { authRequired } from "../middlewares/ValidarToken.js";

const router = Router();

router.get("/proveedores", authRequired, getProvedores);
router.get("/proveedores/:id", authRequired, getProvedorestId);

router.post("/proveedores", authRequired, createProvedores);
router.put("/proveedores/:id", authRequired, updateProvedores);
router.delete("/proveedores/:id", authRequired, deleteProvedores);

export default router;
