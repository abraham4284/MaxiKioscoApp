import { pool } from "../db.js";
import { busquedaIdUser } from "../libs/BusquedaIdUser.js";
import { createMovimientosStock } from '../libs/crearMovimientoStock.js';
import { formatearFechas } from "../libs/formatearFechas.js";


export const getProductos = async (req, res) =>{
    try {
        const { user } = req;
        const idUsuarios = await busquedaIdUser(user.Username)
        const productos = await pool.query('SELECT * FROM productos WHERE idUsuarios = ?',[idUsuarios]);
        res.status(201).json(productos[0])
    } catch (error) {
       res.status(500).json({error: 'Error en el servidor'});
       console.log({error: error.message}); 
    }
}

export const getIdProductos = async (req, res) =>{
    try {
         const { id } = req.params;
         const query = 'SELECT * FROM productos WHERE idProductos = ?'
         const [ rows ] = await pool.query(query,[ id ]);
         
         if(rows.length <= 0 ){
            res.status(404).json({message: 'No existe el producto'});
         }
         res.send(rows[0]);

    } catch (error) {
       res.status(500).json({error: 'Error en el servidor'});
       console.log({error: error.message}); 
    }
}

export const createProductos = async (req, res) =>{
    try {
        const { CodeBar, Descripcion, Precio, Stock, Familia, idProveedores } = req.body;
        const { user } = req;
        const idUsuarios = await busquedaIdUser(user.Username);
        const query = 'INSERT INTO productos (CodeBar, Descripcion, Precio, Stock, Familia, idProveedores,idUsuarios) VALUES (?,?,?,?,?,?,?)'
        const values = [CodeBar, Descripcion, Precio, Stock, Familia, idProveedores,idUsuarios];
        const [ result ] = await pool.query(query,values);
        const producto = {
            idProductos: result.insertId,
            CodeBar,
            Descripcion,
            Precio,
            Stock,
            Familia,
            idProveedores,
            idUsuarios
        };
       res.status(201).json(producto);
    } catch (error) {
       res.status(500).json({error: 'Error en el servidor'});
       console.log({error: error.message}); 
    }
}


export const updateProductos = async (req, res) =>{
    try {
        const { id } = req.params;
        const { user } = req;
        const idUsuarios = await busquedaIdUser(user.Username);
        const { CodeBar, Descripcion, Precio, Stock, Familia, idProveedores, Motivo } = req.body;
        const Fecha = formatearFechas(new Date());
        console.log(Motivo,'Soy el motivo');
        const query = `
        UPDATE productos SET CodeBar = ?, Descripcion = ?, Precio = ?, Stock = ?, Familia = ?, idProveedores = ?
        WHERE idProductos = ?
        `
        const values = [ CodeBar, Descripcion, Precio, Stock, Familia, idProveedores, id ];
        const [ rows ] = await pool.query(query,values);
        
        if(rows.affectedRows === 0){
            res.status(404).json({message: 'No se encontro el producto a actualizar'})
        }

        const [ rowsSelect ] = await pool.query('SELECT * FROM productos WHERE idProductos = ?',[id])
        // Creamos el movimiento Stock
        await createMovimientosStock(Fecha,CodeBar,Descripcion,Motivo,Stock,id,idUsuarios);
        console.log('Movimiento Creado');
        res.json(rowsSelect[0]);       
    } catch (error) {
       res.status(500).json({error: 'Error en el servidor'});
       console.log({error: error.message}); 
    }
}

export const deleteProductos = async (req, res) =>{
    try {
        const { id } = req.params;

        // Primero eliminamos el producto en movimientoStock pq si no dara un error
        const deleteQueryMovimientoStock = "DELETE FROM MovimientoStock WHERE idProductos = ?"
        await pool.query(deleteQueryMovimientoStock,[id])

        //Elminamos el producto en registraciones tmb
        const deletedRegistraciones = "DELETE FROM Registraciones WHERE idProductos = ?"
        await pool.query(deletedRegistraciones,[id])
        
        const query = 'DELETE FROM productos WHERE idProductos = ?'
        const [ rows ] = await pool.query(query,[id])
        
        if(rows.affectedRows === 0){
            res.status(404).json({message: 'No se pudo encontrar el producto a eliminar'});
        }

        res.sendStatus(204);
    } catch (error) {
       res.status(500).json( { error: 'Error en el servidor' } );
       console.log({error: error.message}); 
    }
}


export const GetjoinProductosProveedores = async (req,res)=>{
    try {
         const query =`
          SELECT Registraciones.Producto, Clientes.Nombre, Productos.Stock, Registraciones.Fecha FROM Registraciones
          JOIN Clientes ON Registraciones.idClientes = Clientes.idClientes
          JOIN Productos ON Registraciones.idProductos = Productos.idProductos WHERE Registraciones.Fecha = '28/11/2023'
         `
        const [ rows ] = await pool.query(query);
        res.send(rows[0]);
    } catch (error) {
        res.status(500).json({error: 'Error en el servidor'});
        console.log({error: error.message}); 
    }
}