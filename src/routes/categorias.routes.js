import { Router } from "express";
import { CategoriasController } from "../controllers/categorias.controller.js";
import { CategoriasService } from "../services/categorias.services.js";

const router = Router();
const categoriasService = new CategoriasService();
const categoriasController = new CategoriasController(categoriasService);

router.get("/", categoriasController.obtener);
router.post("/crear", categoriasController.crear);

export default router;
