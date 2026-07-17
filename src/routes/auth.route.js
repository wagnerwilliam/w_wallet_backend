import { Router } from "express";
import { AuthController } from "../auth/auth.controller.js";
import { UsuariosService } from "../services/usuario.service.js";
import { UsuariosValidations } from "../validations/usuarios.validation.js";
import { AuthValidations } from "../auth/auth.validation.js";
import { refreshTokenMiddleware } from "../middlewares/global.middleware.js";
import { AuthService } from "../auth/auth.service.js";
import { CategoriasService } from "../services/categorias.services.js";

/**
 * Router encargado de gestionar todas las rutas relacionadas
 * con la autenticación de usuarios.
 */
const router = Router();

/**
 * Instancias de servicios encargados de la lógica de negocio.
 */
const usuarioService = new UsuariosService();
const usuariosValidations = new UsuariosValidations();
const authValidations = new AuthValidations();
const authService = new AuthService();
const categoriasService = new CategoriasService();
const authController = new AuthController(
  usuarioService,
  usuariosValidations,
  authValidations,
  authService,
  categoriasService,
);

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/refresh", refreshTokenMiddleware, authController.refresh);
router.post("/logout", refreshTokenMiddleware, authController.logout);

export default router;
