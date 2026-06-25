import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

export const Cat = mongoose.model("Cat", { name: String });
