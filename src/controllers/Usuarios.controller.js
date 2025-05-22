import Usuarios from '../models/Usuarios.js'
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

const registro_usuarios = async (recibido, respuesta) => {
    try {
        const { usuario, password, rol, estado } = recibido.body;

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

        if (!consultaUsuario) {
            return respuesta.status(404).json({ "msj": `El usuario ${usuario} no está registrado!` });
        }

        let comparacion = await bcrypt.compare(password, consultaUsuario.password);
        if (!comparacion) {
            return respuesta.status(401).json({ "msj": "Credenciales de acceso no válidas!" });
        }

        if (consultaUsuario.rol === "Inactivo") {
            consultaUsuario.rol = "Activo";
            await consultaUsuario.save();
        }


        const token = jwt.sign({
            id: consultaUsuario._id,
            rol: consultaUsuario.rol 
        }, process.env.JWT_SECRET, { "expiresIn": "1hr" });

        respuesta.status(200).json({
            "msj": "¡Inicio de sesión exitoso!",
            "token": token,
            "usuario": usuario,
            "estado": consultaUsuario.estado,
            "rol": consultaUsuario.rol 
        });
    } catch (error) {
        console.error("Error en iniciar_sesion:", error);
        respuesta.status(500).json({ "msj": "Error interno del servidor al intentar iniciar sesión." });
    }
}

const cerrar_sesion = async (req, res) => {
    try {
        const { usuario } = req.body; 

        if (!usuario) {
            return res.status(400).json({ msj: "Nombre de usuario requerido para cerrar sesión." });
        }

        const consultaUsuario = await Usuarios.findOne({ usuario: usuario });

        if (!consultaUsuario) {
            return res.status(404).json({ msj: `El usuario ${usuario} no fue encontrado.` });
        }

        consultaUsuario.rol = "Inactivo";
        await consultaUsuario.save();

        res.status(200).json({ msj: `Sesión de ${usuario} cerrada exitosamente y rol actualizado a Inactivo.` });

    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        res.status(500).json({ msj: "Error interno del servidor al intentar cerrar sesión." });
    }
};

const consultaUsuarios = async (recibido, respuesta) => {
    try {
        const usuarioss = await Usuarios.find();
        respuesta.json(usuarioss);
    } catch (error) {
        respuesta.status(500).json({ "Error paps": error.message });
    }
};
const consultaUsuario = async (req, res) => {
    try {
        const { usuario } = req.params;
        const resultado = await Usuarios.findOne({ usuario });

        if (!resultado) {
            return res.status(404).json({ estatus: "error", msj: "Usuario no encontrado" });
        }

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ estatus: "error", msj: error.message });
    }
};

const editarUsuarios = async (recibido, respuesta) => {
    try {
        const nombreUsuario = recibido.params.usuario;
        const nuevosDatos = recibido.body;

        if (nuevosDatos.password) {
            nuevosDatos.password = await bcrypt.hash(nuevosDatos.password, 10);
        }

        const usuarioActualizado = await Usuarios.findOneAndUpdate(
            { usuario: nombreUsuario },
            nuevosDatos,
            { new: true }
        );

        if (!usuarioActualizado) {
            return respuesta.status(404).json({ msj: `El usuario '${nombreUsuario}' no fue encontrado` });
        }

        respuesta.json({ msj: "Usuario actualizado correctamente", usuarioActualizado });

    } catch (error) {
        respuesta.status(500).json({ Error: error.message });
    }
};

export { editarUsuarios };
export { registro_usuarios, iniciar_sesion, cerrar_sesion, consultaUsuarios, consultaUsuario }; 