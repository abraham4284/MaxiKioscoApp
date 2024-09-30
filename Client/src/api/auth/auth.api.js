import axios from '../config/axios.js'


export const getUsuariosByNameRequest = (username) => axios.get(`/usuarios/${username}`);
export const verifyRequest = () => axios.get("/verify");

export const registroRequest = (data)=> axios.post("/registro",data);
export const loginRequest = (data)=> axios.post("/login",data);
export const logoutRequest = ()=> axios.post("/logout")


export const updateUsuariosRequest = (id,data)=> axios.put(`/usuarios/${id}`,data)
