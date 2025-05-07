import maximos_ganadores from "../models/maximos_ganadores.js";

const consultaMaximosGanadores = async (recibido, respuesta) => {
    try {
        const ganadores = await maximos_ganadores.find();
        respuesta.json(ganadores);
    } catch (error) {
        respuesta.status(500).json({ "Error": error.message });
    }
};

const consultaMaximoGanador = async (recibido, respuesta) => {
    try {
        const ganador = await maximos_ganadores.findOne({
            nombre: recibido.params.nombre 
        });
        respuesta.json(ganador);
    } catch (error) {
        respuesta.status(500).json({ "Error": error.message });
    }
};

const agregarMaximoGanador = async (recibido, respuesta) => {
    try {
        if (recibido.user) return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"})
        const nuevoGanador = new maximos_ganadores(recibido.body);
        await nuevoGanador.save();
        respuesta.status(201).json(nuevoGanador);
    } catch (error) {
        respuesta.status(500).json({ "Error": error.message });
    }
};

const editarMaximoGanador = async (recibido, respuesta) => {
    try {
        if (recibido.user) return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"})
        const ganadorActualizado = await maximos_ganadores.findOneAndUpdate(
            { nombre: recibido.params.nombre },
            recibido.body,
            { new: true }
        );
        respuesta.json(ganadorActualizado);
    } catch (error) {
        respuesta.status(500).json({ "Error": error.message });
    }
};

const eliminarMaximoGanador = async (recibido, respuesta) => {
    try {
        if (recibido.user) return respuesta.status(500).json({"msj":"no tienes permisos para efectuar esta accion"})
        await maximos_ganadores.findOneAndDelete({ nombre: recibido.params.nombre });
        respuesta.json({ mensaje: "Máximo ganador eliminado correctamente" });
    } catch (error) {
        respuesta.status(500).json({ "Error": error.message });
    }
};

export { consultaMaximosGanadores, consultaMaximoGanador, agregarMaximoGanador, editarMaximoGanador, eliminarMaximoGanador };
