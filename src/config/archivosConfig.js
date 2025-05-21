import multer from "multer";
import path from "path";

/* formatos de imagen válidos */
const extensionesImagen = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// usamos la librería multer para definir los datos del archivo
const storage = multer.diskStorage({
    // carpeta de destino
    destination: (recibido, file, cb) => {
        // carpeta uploads (debe estar en la raíz del proyecto)
        cb(null, 'uploads/');
    },
    // nombre del archivo
    filename: (recibido, file, cb) => {
        // se genera un nombre único a partir de la fecha en que se subió y la extensión del archivo
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// validación de archivos
const fileFilter = (recibido, file, cb) => {
    // validamos el tipo de extensión de archivo
    const extension = path.extname(file.originalname).toLowerCase();
    // hace efectiva la validación
    if (extensionesImagen.includes(extension)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido. Solo imágenes (jpg, jpeg, png, gif, webp).'), false);
    }
};

// definimos el tamaño máximo del archivo
const limits = { fileSize: 3 * 1024 * 1024 };

// creamos una constante upload, esta contendrá las características definidas de multer
const upload = multer({ storage,fileFilter,limits });

// exportación
export default upload;
