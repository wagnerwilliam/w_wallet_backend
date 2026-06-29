import { Router } from "express";
import { GastosController } from "../controllers/gastos.controller.js";
import { GastosService } from "../services/gastos.service.js";

const router = Router();
const gastosService = new GastosService();
const gastosController = new GastosController(gastosService);

router.get("/", gastosController.obtener);
router.post("/crear", gastosController.crear);
router.delete("/eliminar/:id", gastosController.eliminar);
router.patch("/editar/:id", gastosController.editar);

export default router;
