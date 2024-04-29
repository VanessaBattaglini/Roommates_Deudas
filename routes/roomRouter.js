import express from 'express';
const router = express.Router();
import { home, addRoommate, getRoommates } from '../controllers/roomController.js';
import { getGastos } from '../controllers/gastosController.js';

//Prueba conexion
router.get("/", home);

router.post('/roommate', addRoommate);

router.get('/roommates', getRoommates);

router.get("/gastos", getGastos);



export default router;