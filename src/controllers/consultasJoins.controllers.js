import { pool } from '../db.js';

export const getClientRegistraciones = async (req,res)=>{
    try {
        const query = `
        SELECT Clientes.Nombre, Registraciones.Producto, Registraciones.PrecioU, Registraciones.Cantidad,
        Registraciones.Total FROM Clientes
        JOIN Registraciones ON Clientes.idClientes = Registraciones.idClientes
        `
        const [ rows ] = await pool.query(query);
        res.send(rows);
    } catch (error) {
        res.status(500).json({error:"error en el servidor"});
        console.log({error:error.message})
    }
}

export const getIdClientRegistraciones = async (req,res)=>{
    try {
        const { id } = req.params;
        const query = `
        SELECT Clientes.Nombre, Registraciones.Producto, Registraciones.PrecioU, Registraciones.Cantidad,
        Registraciones.Total FROM Clientes
        JOIN Registraciones ON Clientes.idClientes = Registraciones.idClientes WHERE Clientes.idClientes = ?
        `
        const [ rows ] = await pool.query(query,[id]);
        console.log(rows);
        res.send(rows);
    } catch (error) {
        res.status(500).json({error:"error en el servidor"});
        console.log({error:error.message})
    }
}

export const getFourTable = async (req,res)=>{
    try {
        const query = `
        SELECT Clientes.Nombre, Registraciones.Producto, Registraciones.PrecioU, Registraciones.Cantidad,
        Registraciones.Total, Productos.Familia, Productos.CodeBar, Proveedores.Nombre FROM Clientes
        JOIN Registraciones ON Clientes.idClientes = Registraciones.idClientes
        JOIN Productos ON Registraciones.idProductos = Productos.idProductos
        JOIN Proveedores ON Proveedores.idProveedores = Productos.idProveedores
        `
        const [ rows ] = await pool.query(query);
        res.send(rows);
    } catch (error) {
        res.status(500).json({error:"error en el servidor"});
        console.log({error:error.message})
    }
}


export const getIdFourTable = async (req,res)=>{
    try {
        const { id } = req.params;
        const query = `
        SELECT Clientes.Nombre, Registraciones.Producto, Registraciones.PrecioU, Registraciones.Cantidad,
        Registraciones.Total, Productos.Familia, Productos.CodeBar, Proveedores.Nombre FROM Clientes
        JOIN Registraciones ON Clientes.idClientes = Registraciones.idClientes
        JOIN Productos ON Registraciones.idProductos = Productos.idProductos
        JOIN Proveedores ON Proveedores.idProveedores = Productos.idProveedores WHERE Clientes.idClientes = ?
        `
        const [ rows ] = await pool.query(query,[id]);
        res.send(rows);
    } catch (error) {
        res.status(500).json({error:"error en el servidor"});
        console.log({error:error.message})
    }
}

export const buscarPorFechaRegistro = async (req, res)=>{
    try {
         const { Fecha } = req.body;
         const query = `
            SELECT Clientes.Nombre, Clientes.Apellido, Registraciones.Producto, Registraciones.PrecioU,
            Registraciones.Cantidad, Registraciones.Total FROM Clientes
            JOIN Registraciones ON Clientes.idClientes = Registraciones.idClientes WHERE Registraciones.Fecha = ?
         `
        const [ rows ] = await pool.query(query,[Fecha]);
        res.send(rows);
    } catch (error) {
        res.status(500).json({error:"error en el servidor"});
        console.log({error:error.message}) 
    }
}

