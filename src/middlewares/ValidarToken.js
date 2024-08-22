import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next)=>{
    try {
        const { token } = req.cookies;
        
        if(!token) return res.status(401).json({message: 'No existe el token, autorizacion denegada'})

        //Verificamos si realmente existen el token
        //Basciamente la verificacion toma el token lo decodifica y te devuleve un nombre usuario
        jwt.verify(token, TOKEN_SECRET, (error, user)=>{
            if(error) return res.status(401).json({message:'Token invalido'})
            req.user = user;
            next();
        })
        // Utlizamos el req.user = user; para guardar el toquen decodificado
        // pq cuando lo utlizamos en controllers por ejemplo, ya podemos acceder a esa propiedad
        // y nos devolverla lo mismo que en esta funcion, ya podriamos hacer validaciones
    } catch (error) {
        console.log({error: error.message})
        console.log("Soy el error del validarToken")
    }
}
