import axios from '../config/axios.js';

export const getRegistracionesRequest = () => axios.get("/registraciones");
export const getIdRegistracionesRequest = (id) => axios.get(`/registraciones/${id}`);
export const getIdRegistracionesDetallesRequest = (id)=> axios.get(`/registracionesDetalles/${id}`)

export const createRegistracionesRequest = (data) => axios.post("/registraciones",data);

