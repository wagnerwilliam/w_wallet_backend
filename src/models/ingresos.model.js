import { model } from "mongoose";
import { ingresosSchema } from "../schemas/ingresos.schema.js";

// quiza merezc la pena agregar un 3 modelo movimientos que guarde ingresos y egresos analizar para despues.
export const Ingresos = model("Ingresos", ingresosSchema);
