import axios from '../config/axios.js'

export const getMovimientosRequest = () => axios.get("/movimientos");

