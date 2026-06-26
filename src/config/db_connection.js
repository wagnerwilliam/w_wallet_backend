import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

export const connectDB = () => {
  if (!process.env.MONGO_URL) {
    throw new Error(
      "La variable MONGO_URL no está definida en el archivo .env",
    );
  }
  return mongoose.connect(process.env.MONGO_URL);
};
