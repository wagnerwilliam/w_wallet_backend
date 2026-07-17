import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller.js";
import { DashboardService } from "../services/dashboard.service.js";

/**
 * Router encargado de gestionar todas las rutas relacionadas
 * con la autenticación de usuarios.
 */
const router = Router();

/**
 * Instancias de servicios encargados de la lógica de negocio.
 */
const dashboardService = new DashboardService();
const dashboardController = new DashboardController(dashboardService);

router.get("/", dashboardController.obtener);

export default router;
