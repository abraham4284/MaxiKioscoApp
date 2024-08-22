import { Router } from 'express';
import { createNegocios, getNegocios, updateNegocios } from '../controllers/negocios.controllers.js';
import { authRequired } from '../middlewares/ValidarToken.js';


const router = Router();




router.get('/negocios',authRequired, getNegocios);
router.post('/negocios',authRequired, createNegocios);
router.put('/negocios/:id',authRequired, updateNegocios);


export default router;