import { model } from "mongoose";
import { categoriasSchema } from "../schemas/categorias.schema.js";

export const Categorias = model("Categorias", categoriasSchema);
