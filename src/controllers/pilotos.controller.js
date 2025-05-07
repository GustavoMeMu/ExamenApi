import pilotos from "../models/pilotos.js";

const consultaPilotos = async (recibido, respuesta) => {
    try {
        const piloto = await pilotos.find();
        respuesta.json(piloto);
    } catch (error) {
        respuesta.status(500).json({ "Error": error.message });
    }
};

const consultaPiloto = async (recibido, respuesta) => {
    try {
        const pilotoIndividual = await pilotos.findOne({ nombre: recibido.params.nombre });
        respuesta.json(pilotoIndividual);
    } catch (error) {
        return respuesta.status(500).json({ "Error": error.message });
    }
};
const editarPiloto = async (recibido, respuesta) => {
    try {
        if (recibido.user) return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"})
        const pilotoActualizado = await pilotos.findOneAndUpdate(
            { nombre: recibido.params.nombre },
            recibido.body,
            { new: true }
        );
        respuesta.json(pilotoActualizado);
    } catch (error) {
        respuesta.status(500).json({ "Error": error.message });
    }
};
const agregarPiloto = async (recibido, respuesta) => {
    try {
        if (recibido.user) return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"})
        const nuevoPiloto = new pilotos(recibido.body);
        await nuevoPiloto.save();
        respuesta.status(201).json(nuevoPiloto);
    } catch (error) {
        respuesta.status(500).json({ "Error": error.message });
    }
};


const eliminarPiloto = async (recibido, respuesta) => {
    try {
        if (recibido.user) return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"})
        await pilotos.findOneAndDelete({ nombre: recibido.params.nombre });
        respuesta.json({ mensaje: "Piloto eliminado correctamente" });
    } catch (error) {
        respuesta.status(500).json({ "Error": error.message });
    }
};

export { consultaPilotos, consultaPiloto, agregarPiloto, editarPiloto, eliminarPiloto };
