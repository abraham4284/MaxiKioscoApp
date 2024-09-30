import axios from '../config/axios.js'

export const getNegociosRequest = () => axios.get("/negocios");
export const createNegociosRequest = (data) => axios.post("/negocios",data);

export const updateNegociosRequest = (id, data)=> axios.put(`/negocios/${id}`,data);
