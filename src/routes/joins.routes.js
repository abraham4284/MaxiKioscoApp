import { Router } from "express";
import { 
    getClientRegistraciones, 
    getIdClientRegistraciones ,
    getFourTable ,
    getIdFourTable,
    buscarPorFechaRegistro
}
     from '../controllers/consultasJoins.controllers.js'

const router = Router();

router.get('/reg',getClientRegistraciones);
router.get('/regFour',getFourTable);
router.get('/reg/:id',getIdClientRegistraciones);
router.get('/regFour/:id',getIdFourTable);

router.post('/reg',buscarPorFechaRegistro);


export default router;