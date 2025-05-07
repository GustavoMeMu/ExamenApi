import mongoose from 'mongoose';

const UsuariosModelo = new mongoose.Schema({
    usuario: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },               
    rol: { type: String, required: true },                   
    estado: { type: Number, default: 0 }                     
});

export default mongoose.model('usuarios', UsuariosModelo);
