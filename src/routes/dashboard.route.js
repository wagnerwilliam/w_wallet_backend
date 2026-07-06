import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller.js";
import { DashboardService } from "../services/dashboard.service.js";

const router = Router();

const dashboardService = new DashboardService();
const dashboardController = new DashboardController(dashboardService);

router.get("/", dashboardController.obtener);

export default router;
