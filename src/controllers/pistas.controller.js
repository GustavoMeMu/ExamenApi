import pistas from "../models/pistas.js";

const consultaPistas = async (recibido, respuesta) => {
    try {
        const pista = await pistas.find();
        respuesta.json(pista);
    } catch (error) {
        respuesta.status(500).json({ "Error": error.message });
    }
};

const consultaPista = async (recibido, respuesta) => {
    try {
        const pista = await pistas.findOne({ nombre: recibido.params.nombre });

        if (!pista) {
            return respuesta.status(404).json({ "Error": "No se encontró la pista" });
        }

        return respuesta.json(pista);
    } catch (error) {
        return respuesta.status(500).json({ "Error": error.message });
    }
};

const insertarPista = async (recibido, respuesta) => {
    try {
        if (recibido.user ) return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"})
        const nuevaPista = new pistas(recibido.body);
        await nuevaPista.save();
        respuesta.status(201).json(nuevaPista);
    } catch (error) {
        respuesta.status(500).json({ "Error": error.message });
    }
};

const editarPista = async (recibido, respuesta) => {
    try {
        if (recibido.user) return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"})
        const pistaActualizada = await pistas.findOneAndUpdate(
            { nombre: recibido.params.nombre },
            recibido.body,
            { new: true }
        );

        if (!pistaActualizada) {
            return respuesta.status(404).json({ "Error": "No se encontró la pista" });
        }

        return respuesta.json(pistaActualizada);
    } catch (error) {
        return respuesta.status(500).json({ "Error": error.message });
    }
};

const eliminarPista = async (recibido, respuesta) => {
    try {
        if (recibido.user) return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"})
        const pistaEliminada = await pistas.findOneAndDelete({ nombre: recibido.params.nombre });

        if (!pistaEliminada) {
            return respuesta.status(404).json({ "Error": "No se encontró la pista" });
        }

        return respuesta.json({ "Mensaje": "Pista eliminada correctamente" });
    } catch (error) {
        return respuesta.status(500).json({ "Error": error.message });
    }
};

export { consultaPistas, consultaPista, insertarPista, editarPista, eliminarPista };
