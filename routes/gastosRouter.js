import express from "express";
const router = express.Router();
import { getGastos, addGastos, deleteGastos, editGasto } from "../controllers/gastosController.js";

router.get('/gastos', getGastos);

router.post('/gasto', addGastos);

router.delete('/gasto', deleteGastos);

router.put('/gasto', editGasto);

export default router;
