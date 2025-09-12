import axios from '../config/axios.js'

export const getProductosRequest = () => axios.get("/productos");
export const getIdProductosRequest = (id) => axios.get(`/productos/${id}`);

export const createProductosRequest = (data) => axios.post("/productos",data);
export const updateProductosRequest = (id,data)=> axios.put(`/productos/${id}`,data);

export const deleteProductosRequest = (id)=> axios.delete(`/productos/${id}`);