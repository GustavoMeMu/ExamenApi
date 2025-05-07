import mongoose from 'mongoose';

const maximos_ganadoresModelo = new mongoose.Schema({
    nombre: { type: String, required: true },
    pais: { type: String, required: true },
    victorias: { type: Number, required: true },
    titulos: { type: Number, required: true },
});

export default mongoose.model('maximos_ganadores', maximos_ganadoresModelo);
