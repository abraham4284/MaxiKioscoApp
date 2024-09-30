import axios from '../config/axios.js'

export const descargarTicketRequest = (id)=> axios.get(`/ticket/${id}`, { responseType: 'blob' })