import mongoose from "mongoose";
import { ingresosSchema } from "../schemas/ingresos.js";

export const Ingresos = mongoose.model("Ingresos", ingresosSchema);
