import { Router } from "express";
import { 
     getRegistraciones,
     getIdRegistraciones,
     crearRegistraciones, 
     updateRegistraciones,
     deleteRegistraciones,
     getRegistracionesDetalles
} from '../controllers/registraciones.controllers.js';
import { authRequired } from '../middlewares/ValidarToken.js'


const router = Router();

router.get('/registraciones',authRequired, getRegistraciones);
router.get('/registraciones/:id',authRequired, getIdRegistraciones);
router.get('/registracionesDetalles/:id',authRequired, getRegistracionesDetalles);

router.post('/registraciones', authRequired, crearRegistraciones);
router.put('/registraciones/:id', updateRegistraciones);
router.delete('/registraciones/:id', deleteRegistraciones);


export default router;