import { pool } from '../db.js';

export const modificarStockVenta = async (idProductos,Stock)=>{
    try {
        
        const product = await pool.query('SELECT Stock FROM productos WHERE idProductos = ?',[idProductos])
        const stockActual = product[0][0].Stock;
        const stockBaja = Stock;
        const resultadoFinal = stockActual - stockBaja;

        // Mandamos a modificar el stock
         await pool.query('UPDATE productos SET Stock = ? WHERE idProductos = ?',[resultadoFinal,idProductos])
         console.log('stock modificado')
    } catch (error) {
      console.log({error:error.message});
      console.log('error en libs')
    }
}


export const modificarStockVentaTransaction = async (idProductos,Stock,conn)=>{
    try {
        
        const product = await conn.query('SELECT Stock FROM productos WHERE idProductos = ?',[idProductos])
        const stockActual = product[0][0].Stock;
        const stockBaja = Stock;
        const resultadoFinal = stockActual - stockBaja;

        // Mandamos a modificar el stock
         await conn.query('UPDATE productos SET Stock = ? WHERE idProductos = ?',[resultadoFinal,idProductos])
         console.log('stock modificado')
    } catch (error) {
      console.log({error:error.message});
      console.log('error en libs')
    }
}