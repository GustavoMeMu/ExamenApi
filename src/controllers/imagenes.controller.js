import Imagen from '../models/imagen.js';
import fs from 'fs/promises';
import path from 'path'; 
import { fileURLToPath } from 'url'; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads');



const cargarImagen = async (recibido, respuesta) => {

  if (!recibido.file) {
    return respuesta.status(500).json({
      estatus: "Error",
      msj: "No se ha cargado ningún archivo. Asegúrate de que el campo 'image' y los límites de tamaño sean correctos."
    });
  }

  try {

    const { filename } = recibido.file; 

    const rutaPublica = `/uploads/${filename}`;


    const nuevaImagen = new Imagen({
      nombreArchivo: filename, 
      ruta: rutaPublica,       
    });


    await nuevaImagen.save(); 

    respuesta.status(201).json({
      estatus: "Correcto",
      msj: "Archivo subido y registrado en la base de datos correctamente.",
      imagen: { 
        _id: nuevaImagen._id, 
        nombreArchivo: nuevaImagen.nombreArchivo,
        ruta: nuevaImagen.ruta
      }
    });

  } catch (error) {
    
    console.error("Error al guardar la información de la imagen en la base de datos:", error);

   
    if (recibido.file && recibido.file.path) {
      
      fs.unlink(recibido.file.path)
        .then(() => console.log("Archivo físico eliminado después de fallo en DB."))
        .catch((err) => console.error("Error al eliminar el archivo físico después de un fallo en la DB:", err));
    }

    respuesta.status(500).json({
      estatus: "Error",
      msj: "Error interno del servidor al procesar la imagen."
    });
  }
};


const obtenerImagenes = async (recibido, respuesta) => {
  try {
    
    const imagenes = await Imagen.find({});

    respuesta.status(200).json({
      estatus: "Correcto",
      msj: "Imágenes obtenidas correctamente.",
      imagenes: imagenes 
    });
  } catch (error) {
    console.error("Error al obtener las imágenes de la base de datos:", error);
    respuesta.status(500).json({
      estatus: "Error",
      msj: "Error al obtener las imágenes de la base de datos."
    });
  }
};


const eliminarImagen = async (recibido, respuesta) => {
  const imageId = recibido.params.id; 

  try {
    
    const imagenAEliminar = await Imagen.findById(imageId);

    if (!imagenAEliminar) {
      console.log(`Imagen con ID ${imageId} no encontrada en la DB.`);
      return respuesta.status(404).json({
        estatus: "Error",
        msj: "Imagen no encontrada en la base de datos."
      });
    }

    const filename = imagenAEliminar.nombreArchivo; 
    const filePath = path.join(UPLOADS_DIR, filename); 


    try {
      await fs.unlink(filePath);
      console.log(`Archivo ${filename} eliminado del sistema de archivos.`);
    } catch (fileError) {

      if (fileError.code === 'ENOENT') {
        console.warn(`Advertencia: El archivo físico ${filename} no se encontró en el servidor, pero se eliminará el registro de la DB.`);
      } else {
        console.error(`Error al eliminar el archivo físico ${filename}:`, fileError);

      }
    }


    await Imagen.findByIdAndDelete(imageId);
    console.log(`Registro de imagen con ID ${imageId} eliminado de la base de datos.`);

    respuesta.status(200).json({
      estatus: "Correcto",
      msj: `Imagen "${filename}" eliminada exitosamente.`
    });

  } catch (error) {
    console.error('Error interno del servidor al eliminar la imagen:', error);
    respuesta.status(500).json({
      estatus: "Error",
      msj: "Error interno del servidor al eliminar la imagen."
    });
  }
};



export {
  cargarImagen,
  obtenerImagenes,
  eliminarImagen
};