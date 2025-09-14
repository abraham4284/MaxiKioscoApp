import { pool } from '../db.js'

export const createMovimientosStock = async ( Fecha,CodeBar, Descripcion,Motivo, Cantidad, idProductos,idUsuarios )=>{
    try {
        const queryMovimientoStock = `
        INSERT INTO movimientostock (Fecha, CodeBar, Descripcion, Motivo, Cantidad, idProductos,idUsuarios)
        VALUES (?,?,?,?,?,?,?)
        `
        const values = [ Fecha, CodeBar, Descripcion, Motivo, Cantidad, idProductos,idUsuarios]
        await pool.query(queryMovimientoStock,values);
    } catch (error) {
        console.log({error:error.message});
        console.log('error en libs crear movimientoStock')
    }
}


export const createMovimientosStockTransaction = async ( Fecha,CodeBar, Descripcion,Motivo, Cantidad, idProductos,idUsuarios,conn )=>{
    try {
        const queryMovimientoStock = `
        INSERT INTO movimientostock (Fecha, CodeBar, Descripcion, Motivo, Cantidad, idProductos,idUsuarios)
        VALUES (?,?,?,?,?,?,?)
        `
        const values = [ Fecha, CodeBar, Descripcion, Motivo, Cantidad, idProductos,idUsuarios]
        await conn.query(queryMovimientoStock,values);
    } catch (error) {
        console.log({error:error.message});
        console.log('error en libs crear movimientoStock')
    }
}