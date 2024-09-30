import axios from '../config/axios.js'

export const getClientesRequest = () => axios.get("/cliente");
export const getIdClientesRequest = (id)=> axios.get(`/cliente/${id}`);

export const createClientesRequest = (data)=> axios.post("/cliente",data);

export const updateClientesRequest = (id,data)=> axios.put(`/cliente/${id}`,data)

export const deleteClientesRequest = (id)=> axios.delete(`/cliente/${id}`);