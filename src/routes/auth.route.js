import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { UsuariosService } from "../services/usuario.service.js";
import { UsuariosValidations } from "../validations/usuarios.js";
import { AuthValidations } from "../validations/auth.js";
import { authorizationMiddleware } from "../middlewares/global.js";

const router = Router();

const usuarioService = new UsuariosService();
const usuariosValidations = new UsuariosValidations();
const authValidations = new AuthValidations();
const authController = new AuthController(
  usuarioService,
  usuariosValidations,
  authValidations,
);

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authorizationMiddleware, authController.logout);

export default router;
