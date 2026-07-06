import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  await mongoose.connect(process.env.MONGO_URL);

  isConnected = true;

  console.log("MongoDB conectado.");
};
