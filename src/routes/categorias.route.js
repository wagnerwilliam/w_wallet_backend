import { Router } from "express";
import { CategoriasController } from "../controllers/categorias.controller.js";
import { CategoriasService } from "../services/categorias.services.js";
import { CategoriasValidations } from "../validations/categorias.validation.js";

/**
 * Router encargado de gestionar todas las rutas relacionadas
 * con la autenticación de usuarios.
 */
const router = Router();

/**
 * Instancias de servicios encargados de la lógica de negocio.
 */
const categoriasService = new CategoriasService();
const categoriasValidations = new CategoriasValidations();
const categoriasController = new CategoriasController(
  categoriasService,
  categoriasValidations,
);

router.get("/", categoriasController.obtener);
router.post("/crear", categoriasController.crear);
router.delete("/eliminar/:id", categoriasController.eliminar);
router.patch("/editar/:id", categoriasController.editar);

export default router;
