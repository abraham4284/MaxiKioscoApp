import { pool } from '../db.js';


export const getMovimientosStock = async (req, res) =>{
    try {
        const { user } = req;
        const movimientosStock = await pool.query('SELECT * FROM movimientostock WHERE idUsuarios = ?',[user.idUsuarios]);
        res.send(movimientosStock[0])
    } catch (error) {
        res.status(500).json({error: 'Error en el servidor'});
        console.log({error: error.message}); 
    }
}


export const getIdMovimientosStock = async (req, res) =>{
    try {
        const { id } = req.params;
        const query = 'SELECT * FROM movimientostock WHERE idMovimientoStock = ?'
        const [ rows ] = await pool.query(query,[id]);
        if(rows.length <= 0){
            res.status(404).json({message: 'No se encontro el registro del movimiento de stock'})
        }
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({error: 'Error en el servidor'});
        console.log({error: error.message}); 
    }
}


export const createMovimientosStock = async (req, res) =>{
    try {
        const { Fecha, CodeBar, Descripcion, Motivo, Cantidad, idProductos } = req.body;
        const query = `
        INSERT INTO movimientostock (Fecha, CodeBar, Descripcion, Motivo, Cantidad, idProductos)
        VALUES (?,?,?,?,?,?)
        `
        const values = [Fecha, CodeBar, Descripcion, Motivo, Cantidad, idProductos];
        await pool.query(query,values);
        res.send('Movimiento creado');
    } catch (error) {
        res.status(500).json({error: 'Error en el servidor'});
        console.log({error: error.message}); 
    }
}


export const updateMovimientosStock = async (req, res) =>{
    try {
        const { id } = req.params;
        const { Fecha, CodeBar, Descripcion, Motivo, Cantidad, idProductos } = req.body;
        const query = `
        UPDATE movimientostock SET Fecha = ?, CodeBar = ?, Descripcion = ?, Motivo = ?, Cantidad = ?,
        idProductos = ? WHERE idMovimientoStock = ?
        `
        const values = [Fecha, CodeBar, Descripcion, Motivo, Cantidad, idProductos, id];
        const [ rows ] = await pool.query(query,values);
        if(rows.affectedRows === 0){
            res.status(404).json({message: 'No se encontro el movieento a actualizar'});
        }

        const [ rowsSelect ] = await pool.query('SELECT * FROM movimientostock WHERE idMovimientoStock = ?',[id]);
        res.send(rowsSelect[0]);
    } catch (error) {
        res.status(500).json({error: 'Error en el servidor'});
        console.log({error: error.message}); 
    }
}


export const deleteMovimientosStock = async (req, res) =>{
    try {
        const { id } = req.params;
        const query = 'DELETE FROM movimientostock WHERE idMovimientoStock = ?'
        const [rows] = await pool.query(query,[id])
        if(rows.affectedRows === 0){
            res.status(404).json({message: 'No se encontro el movimiento a eliminar'})
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({error: 'Error en el servidor'});
        console.log({error: error.message}); 
    }
}