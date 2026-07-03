import mongoose from "mongoose";
import { connectDB } from "../config/db_connection.js";
import { Gastos } from "../models/gastos.model.js";

/**
 * Servicio encargado de gestionar todas las operaciones CRUD
 * relacionadas con la colección de Gastos en la base de datos.
 *
 * Este servicio maneja explícitamente la conexión y desconexión
 * a MongoDB por cada operación para asegurar control de recursos.
 */

export class GastosService {
  obtenerGastos = (user_id) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          return Gastos.find({ user_id });
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

  crearGasto = (data) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          const nuevoGasto = new Gastos(data);
          return nuevoGasto.save();
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

  editarGasto = (id, data, user_id) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          return Gastos.updateOne(
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

  eliminarGasto = (id, user_id) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          return Gastos.deleteOne({ _id: id, user_id });
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
