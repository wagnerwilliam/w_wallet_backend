import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { UsuariosService } from "../services/usuario.service.js";
import { UsuariosValidations } from "../validations/usuarios.js";

const router = Router();

const usuarioService = new UsuariosService();
const usuariosValidations = new UsuariosValidations();
const authController = new AuthController(usuarioService, usuariosValidations);

//router.post("/login");
router.post("/register", authController.register);
//router.post("/logout");

export default router;
