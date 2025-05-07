import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const Conexion = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10,
            minPoolSize: 5
        });
        console.log('Conectado a Mongo con Pooling');
    } catch (error) {
        console.log("error en la conexion", error.message);
        process.exit(1);
    }
}

export default Conexion;
