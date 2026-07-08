import { photoSchema } from "../schemas/fotos.schema.js";
import { model } from "mongoose";

export const Fotos = model("Fotos", photoSchema);
