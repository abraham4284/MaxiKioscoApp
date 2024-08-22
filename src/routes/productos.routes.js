import { Router } from "express";
import {
    getProductos,
    getIdProductos,
    createProductos,
    updateProductos,
    deleteProductos,
    GetjoinProductosProveedores

} from '../controllers/productos.controllers.js';
import { authRequired } from '../middlewares/ValidarToken.js'

const router = Router();

router.get('/productos',authRequired, getProductos)
router.get('/productos/:id',authRequired, getIdProductos)

router.get('/prueba',authRequired, GetjoinProductosProveedores);

router.post('/productos', authRequired, createProductos)
router.put('/productos/:id',authRequired, updateProductos)

router.delete('/productos/:id',authRequired, deleteProductos)



export default router;
