import express from 'express';
import morga from 'morgan';

import authRouter from './routes/Auth.Routes.js';
import clientesRouter from './routes/clientes.routes.js'
import productosRouter from './routes/productos.routes.js'
import registraciones from './routes/registraciones.routes.js'
import proveedores from './routes/proveedores.routes.js'
import movimientosStock from './routes/movimientosStock.routes.js';
import joinsRouter from './routes/joins.routes.js'
import negociosRoutes from './routes/negocios.routes.js'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import cors from 'cors';



const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));


app.get("/",(req,res)=>{
  res.send("Api funcionando")
})

app.use(morga('dev'));
//  express.json() es para que convierta los req.body en formate json
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
})
app.use(express.json())

app.use('/api',authRouter);
app.use('/api',clientesRouter);
app.use('/api',productosRouter);
app.use('/api',registraciones)
app.use('/api',proveedores)
app.use('/api',movimientosStock)
app.use('/api',joinsRouter)
app.use('/api',negociosRoutes)




export default app;