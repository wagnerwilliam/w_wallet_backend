import { Router } from "express";
import { IngresosController } from "../controllers/ingresos.controller.js";
import { IngresosService } from "../services/ingresos.services.js";
import { IngresosValidations } from "../validations/ingresos.validation.js";

const router = Router();
const ingresoService = new IngresosService();
const ingresoValidations = new IngresosValidations();
const ingresoController = new IngresosController(
  ingresoService,
  ingresoValidations,
);

router.get("/", ingresoController.obtener);
router.post("/crear", ingresoController.crear);
router.delete("/eliminar/:id", ingresoController.eliminar);
router.patch("/editar/:id", ingresoController.editar);

export default router;
