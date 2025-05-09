import mongoose from 'mongoose';

const UsuariosModelo = new mongoose.Schema({
    usuario: { type: String, required: true, unique: true }, 
    password: { type: String, required: true },               
    rol: {
        type: String,
        enum: ["Activo", "Inactivo"],
        default: "Inactivo",
        required: true
      },                  
      estado: {
        type: Number,
        enum: [0, 1],
        default: 1,
        required: true
      }                    
});

export default mongoose.model('usuarios', UsuariosModelo);
