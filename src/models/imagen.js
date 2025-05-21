import mongoose from 'mongoose'; 

const imagenSchema = new mongoose.Schema({
    
    nombreArchivo: {
        type: String,     
        required: true,   
        unique: true      
    },

    ruta: {
        type: String,    
        required: true   
    },

    fechaSubida: {
        type: Date,      
        default: Date.now 
    }
});

const Imagen = mongoose.model('Imagen', imagenSchema);

export default Imagen; 