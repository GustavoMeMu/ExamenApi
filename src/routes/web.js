import {Router} from 'express';
import {consultaPilotos, consultaPiloto, agregarPiloto, editarPiloto, eliminarPiloto} from '../controllers/pilotos.controller.js'
import { consultaPistas, consultaPista, insertarPista, editarPista, eliminarPista } from '../controllers/pistas.controller.js';
import { consultaMaximosGanadores, consultaMaximoGanador, agregarMaximoGanador, editarMaximoGanador, eliminarMaximoGanador } from '../controllers/maximos_ganadores.controller.js';
import { consultaUsuarios,consultaUsuario, editarUsuarios, iniciar_sesion, registro_usuarios } from '../controllers/Usuarios.controller.js';
import authMiddleware from '../config/authMiddleware.js';
const router = Router();

router.get("/pilotos", consultaPilotos );
router.get('/piloto/:nombre',consultaPiloto);
router.post("/agregarPiloto", authMiddleware, agregarPiloto);
router.put("/editarPiloto/:nombre", editarPiloto);
router.delete("/eliminarPiloto/:nombre", authMiddleware, eliminarPiloto);
// aqui van las rutas de las pistas
router.get("/pistas",consultaPistas);
router.get('/pista/:nombre', consultaPista);
router.post('/agregarPista/', authMiddleware,insertarPista);
router.put('/editarPista/:nombre', authMiddleware,editarPista);
router.delete('/eliminarPista/:nombre', authMiddleware,eliminarPista);
// aqui van las ritas maximos ganadores
router.get("/maximosGanadores", consultaMaximosGanadores);
router.get('/maximoGanador/:nombre', consultaMaximoGanador);
router.post("/agregarMaximoGanador", authMiddleware, agregarMaximoGanador);
router.put("/editarMaximoGanador/:nombre", authMiddleware, editarMaximoGanador);
router.delete("/eliminarMaximoGanador/:nombre", authMiddleware, eliminarMaximoGanador);

router.post("/registro", registro_usuarios);
router.post ("/login", iniciar_sesion);
router.get ("/usuarios", consultaUsuarios);
router.put ("/usuarios/editar/:usuario",authMiddleware, editarUsuarios);
router.get('/usuarios/:usuario', authMiddleware, consultaUsuario);


router.use((recibido, respuesta)=>{
    respuesta.status(404).json({
        "estatus" : "error",
        "msj" : "Ruta no encontrada"
    });
});

export default router;