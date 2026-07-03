import { model } from "mongoose";
import { usuariosSchema } from "../schemas/usuarios.js";

export const Usuarios = model("Usuarios", usuariosSchema);
