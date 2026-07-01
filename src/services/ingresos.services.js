import mongoose from "mongoose";
import { Ingresos } from "../models/ingresos.js";
import { connectDB } from "../config/db_connection.js";

/**
 * Servicio encargado de gestionar operaciones CRUD de Ingresos.
 * Maneja conexión directa con MongoDB mediante Mongoose.
 */

export class IngresosService {
  obtenerIngresos = () => {
    return new Promise((ok, ko) => {
      let isConnected = false;

      connectDB()
        .then(() => {
          isConnected = true;
          return Ingresos.find();
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

  editarIngreso = (id, data) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          return Ingresos.updateOne(
            { _id: id },
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

  eliminarIngreso = (id) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          return Ingresos.deleteOne({ _id: id });
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
