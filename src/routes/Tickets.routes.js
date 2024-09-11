import { Router } from "express";
import { generadorTicket } from "../controllers/GenerarTicket.js";
import { authRequired } from "../middlewares/ValidarToken.js";


const router = Router();

router.get("/ticket/:id",authRequired, generadorTicket)

export default router;