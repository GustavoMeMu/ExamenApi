import Usuarios from '../models/Usuarios.js'
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const registro_usuarios = async (recibido, respuesta) => {
    try {
        const { usuario, password, rol, estado } = recibido.body;

        // Validación simple de los campos
        if (!usuario || !password || !rol || !estado) {
            return respuesta.status(400).json({ msj: "Faltan campos obligatorios" });
        }

        const cifrado = await bcrypt.hash(password, 10);
        const registro = new Usuarios({ usuario, password: cifrado, rol, estado });

        await registro.save();
        respuesta.status(201).json({ msj: "usuario registrado", registro });

    } catch (error) {
        console.error("Error en el servidor:", error);
        respuesta.status(500).json({ msj: error.message || "Error interno del servidor" });
    }
};

const iniciar_sesion = async (recibido, respuesta) => {
    try {
        const { usuario, password } = recibido.body;
        const consultaUsuario = await Usuarios.findOne({ "usuario": usuario });
        if (!consultaUsuario) return respuesta.status(500).json({ "msj": `El usuario ${usuario} no esta registrado!` });
        let comparacion = await bcrypt.compare(password, consultaUsuario.password);
        if (!comparacion) return respuesta.status(500).json({ "msj": "Credenciales de acceso no validas!" })

        const token = jwt.sign({
            id: consultaUsuario._id,
            rol: consultaUsuario.rol
        }, process.env.JWT_SECRET, { "expiresIn": "1hr" });

        respuesta.status(201).json({ "msj": "Iniciando Sesion exitos!","token":token, "usuario":usuario});
    } catch (error) {
        respuesta.status(500).json({ "msj": error.msj })
    }
}

export { registro_usuarios, iniciar_sesion }
