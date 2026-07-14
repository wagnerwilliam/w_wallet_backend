import { model } from "mongoose";
import { metasSchema, savedAmountSchema } from "../schemas/metas.schema.js";

export const Metas = model("Metas", metasSchema);
export const SavedAmount = model("SavedAmount", savedAmountSchema);
