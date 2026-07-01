import mongoose from "mongoose";
import { usuariosSchema } from "../schemas/usuarios.js";

export const Usuarios = mongoose.model("Usuarios", usuariosSchema);
