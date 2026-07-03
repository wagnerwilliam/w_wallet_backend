import { model } from "mongoose";
import { ingresosSchema } from "../schemas/ingresos.schema.js";

export const Ingresos = model("Ingresos", ingresosSchema);
