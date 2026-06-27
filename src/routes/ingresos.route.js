import { Router } from "express";
import { IngresosController } from "../controllers/ingresos.controller.js";
import { IngresosService } from "../services/ingresos.services.js";

const router = Router();
const ingresoService = new IngresosService();
const ingresoController = new IngresosController(ingresoService);

router.get("/", ingresoController.obtener);
router.post("/crear", ingresoController.crear);
router.delete("/eliminar/:id", ingresoController.eliminar);
router.patch("/editar/:id", ingresoController.editar);

export default router;
