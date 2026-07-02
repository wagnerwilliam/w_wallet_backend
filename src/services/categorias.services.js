import mongoose from "mongoose";
import { Categorias } from "../models/categorias.js";
import { connectDB } from "../config/db_connection.js";

/**
 * Servicio encargado de manejar todas las operaciones
 * relacionadas con la colección "Categorias" en MongoDB.
 *
 * Responsabilidades:
 * - Conectar a la base de datos
 * - Ejecutar operaciones CRUD
 * - Retornar resultados o errores al controlador
 *
 * Nota: Cada método abre y cierra la conexión a MongoDB
 * para evitar conexiones persistentes innecesarias.
 */
export class CategoriasService {
  obtenerCategorias = (user_id) => {
    return new Promise((ok, ko) => {
      let isConnected = false;

      connectDB()
        .then(() => {
          isConnected = true;
          return Categorias.find({ user_id });
        })
        .then((response) => ok(response))
        .catch((error) => ko(error))
        .finally(() => {
          if (isConnected) {
            mongoose.disconnect();
          }
        });
    });
  };

  crearCategoria = (data) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          const nuevaCategoria = new Categorias(data);
          return nuevaCategoria.save();
        })
        .then((response) => ok(response))
        .catch((error) => ko(error))
        .finally(() => {
          if (isConnected) {
            mongoose.disconnect();
          }
        });
    });
  };

  editarCategoria = (id, data, user_id) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          return Categorias.updateOne(
            { _id: id, user_id },
            { $set: { ...data, updated_at: new Date() } },
          );
        })
        .then((response) => ok(response))
        .catch((error) => ko(error))
        .finally(() => {
          if (isConnected) {
            mongoose.disconnect();
          }
        });
    });
  };

  eliminarCategoria = (id, user_id) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          return Categorias.deleteOne({ _id: id, user_id });
        })
        .then((response) => ok(response.deletedCount))
        .catch((error) => ko(error))
        .finally(() => {
          if (isConnected) {
            mongoose.disconnect();
          }
        });
    });
  };
}
