import { model } from "mongoose";
import { gastosSchema } from "../schemas/gastos.schema.js";

export const Gastos = model("Gastos", gastosSchema);
