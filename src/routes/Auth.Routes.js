import { Router } from "express";
import { register, login, logout, verifyToken, getUsernameUsuarios, updateUsuarios } from "../controllers/auth.controllers.js";
import { authRequired } from "../middlewares/ValidarToken.js";

const router = Router();

router.post('/registro',register);
router.post('/login', login)
router.post('/logout', logout)

router.get('/verify',verifyToken);
router.get('/usuarios/:Username',authRequired, getUsernameUsuarios)

router.put("/usuarios/:id",authRequired, updateUsuarios)

export default router;