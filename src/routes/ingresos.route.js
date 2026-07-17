import { Router } from "express";
import { IngresosController } from "../controllers/ingresos.controller.js";
import { IngresosService } from "../services/ingresos.services.js";
import { IngresosValidations } from "../validations/ingresos.validation.js";

/**
 * Router encargado de gestionar todas las rutas relacionadas
 * con la autenticación de usuarios.
 */
const router = Router();

/**
 * Instancias de servicios encargados de la lógica de negocio.
 */
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
