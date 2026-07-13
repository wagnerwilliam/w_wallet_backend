import { model } from "mongoose";
import { metasSchema } from "../schemas/metas.schema.js";

export const Metas = model("Metas", metasSchema);
