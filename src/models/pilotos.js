import mongoose from 'mongoose';

const pilotosModelo = new mongoose.Schema({
    nombre:{type:String,required:true},
    equipo:{type:String,required:true},
    numero:{type:Number,required:true}
});
export default mongoose.model('pilotos',pilotosModelo,'pilotos');