import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller.js";
import { UsuariosService } from "../services/usuario.service.js";

const router = Router();
const suariosService = new UsuariosService();
const usuariosController = new UsuariosController(suariosService);

router.get("/detalle", usuariosController.detalle);
router.patch("/editar", usuariosController.editar);

export default router;
