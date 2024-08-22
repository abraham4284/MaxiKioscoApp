import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken';

//Generamos el token de acceso

// export const createAccesToken = ( data ) =>{
//     try {
//         return new Promise((resolve,reject)=>{
//             jwt.sign(data,TOKEN_SECRET,(error,token)=>{
//                 if(error) reject(error)
//                 resolve(token)
//             })
//         })
//     } catch (error) {
//         console.log({error: error.message});
//         console.log("Error de la creacion del token")
//     }
// }

export const createAccesToken = (usuario)=>{
    try {
        return jwt.sign(usuario, TOKEN_SECRET)
    } catch (error) {
        console.log('Error en la creacion del token', error.message)
    }
}
