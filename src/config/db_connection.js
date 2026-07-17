import mongoose from "mongoose";

let isConnected = false;

/**
 * Establece la conexión con la base de datos MongoDB.
 *
 * Si ya existe una conexión activa, la función finaliza sin intentar
 * crear una nueva. En caso contrario, establece la conexión utilizando
 * la cadena definida en la variable de entorno `MONGO_URL`.
 *
 * @returns {Promise<void>}
 */

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  await mongoose.connect(process.env.MONGO_URL);

  isConnected = true;

  console.log("MongoDB conectado.");
};
