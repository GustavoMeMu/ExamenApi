import mongoose from 'mongoose';

const pistasModelo = new mongoose.Schema({
    nombre: { type: String, required: true },
    pais: { type: String, required: true },
    longitud_km: { type: Number, required: true },
    vueltas: { type: Number, required: true },
});

export default mongoose.model('pistas', pistasModelo);
