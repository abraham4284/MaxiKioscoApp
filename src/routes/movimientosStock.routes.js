import { Router } from "express";
import{
    getMovimientosStock,
    getIdMovimientosStock,
    createMovimientosStock,
    updateMovimientosStock,
    deleteMovimientosStock
} 
from '../controllers/movimientosStock.controllers.js'
import { authRequired } from "../middlewares/ValidarToken.js";

const router = Router();

router.get('/movimientos',authRequired, getMovimientosStock);
router.get('/movimientos/:id',authRequired, getIdMovimientosStock);

router.post('/crearMovimientos',authRequired, createMovimientosStock);
router.put('/movimientos/:id',authRequired, updateMovimientosStock);
router.delete('/movimientos/:id',authRequired, deleteMovimientosStock);


export default router;