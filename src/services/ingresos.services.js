import mongoose from "mongoose";
import { Ingresos } from "../models/ingresos.model.js";
import { connectDB } from "../config/db_connection.js";

/**
 * Servicio encargado de gestionar operaciones CRUD de Ingresos.
 * Maneja conexión directa con MongoDB mediante Mongoose.
 */

export class IngresosService {
  obtenerIngresos = (user_id) => {
    return new Promise((ok, ko) => {
      let isConnected = false;

      connectDB()
        .then(() => {
          isConnected = true;
          return Ingresos.find({ user_id });
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

  crearIngreso = (data) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          const nuevaIngreso = new Ingresos(data);
          return nuevaIngreso.save();
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

  editarIngreso = (id, data, user_id) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          return Ingresos.updateOne(
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

  eliminarIngreso = (id, user_id) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          return Ingresos.deleteOne({ _id: id, user_id });
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
