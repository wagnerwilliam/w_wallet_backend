import mongoose from "mongoose";
import { categoriasSchema } from "../schemas/categorias.js";

export const Categorias = mongoose.model("Categorias", categoriasSchema);
