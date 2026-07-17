import { Router } from "express";
import { UsuariosController } from "../controllers/usuarios.controller.js";
import { UsuariosService } from "../services/usuario.service.js";
import { upload } from "../middlewares/multer.middleware.js";
import { CloudinaryService } from "../services/cloudinary.service.js";
import { FotosService } from "../services/fotos.service.js";

/**
 * Router encargado de gestionar todas las rutas relacionadas
 * con la autenticación de usuarios.
 */
const router = Router();

/**
 * Instancias de servicios encargados de la lógica de negocio.
 */
const suariosService = new UsuariosService();
const fotosService = new FotosService();
const cloudinaryService = new CloudinaryService();
const usuariosController = new UsuariosController(
  suariosService,
  cloudinaryService,
  fotosService,
);

router.get("/detalle", usuariosController.detalle);
router.patch("/editar", upload.single("photo"), usuariosController.editar);

export default router;
