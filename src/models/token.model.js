import { tokenSchema } from "../schemas/refreshTokens.schema.js";
import { model } from "mongoose";

export const Token = model("Token", tokenSchema);
