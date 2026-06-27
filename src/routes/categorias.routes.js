import { Router } from "express";
import { CategoriasController } from "../controllers/categorias.controller.js";
import { CategoriasService } from "../services/categorias.services.js";

const router = Router();
const categoriasService = new CategoriasService();
const categoriasController = new CategoriasController(categoriasService);

router.get("/", categoriasController.obtener);
router.post("/crear", categoriasController.crear);
router.delete("/eliminar/:id", categoriasController.eliminar);
router.patch("/editar/:id", categoriasController.editar);

export default router;
