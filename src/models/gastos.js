import mongoose from "mongoose";
import { gastosSchema } from "../schemas/gastos.js";

export const Gastos = mongoose.model("Gastos", gastosSchema);
