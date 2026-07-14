import { Router } from "express";
import { MetasController } from "../controllers/metas.controller.js";
import { MetasService } from "../services/metas.service.js";

const router = Router();
const metasService = new MetasService();
const metasController = new MetasController(metasService);

router.get("/", metasController.obtener);
router.get("/resumen", metasController.obtenerResumenMetas);
router.post("/crear", metasController.crear);
router.get("/detalle/:id", metasController.detalle);
router.patch("/editar/:id", metasController.editar);
router.patch("/agregar-ahorro/:id", metasController.agregarAhorro);

export default router;
