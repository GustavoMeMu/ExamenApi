import express from 'express';
import cors from 'cors';
import router from './src/routes/Web.js';
import Conexion from './src/config/Conexion.js';

const app = express();
app.use(express.json());
app.use(cors());
Conexion();
app.use("/imagenes", express.static("uploads"));
app.use("/",router);


const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO,() =>{
    console.log("El Servidor Esta Corriendo");
    console.log(`🌐 URL: http://localhost:${PUERTO}`);
});