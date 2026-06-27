import mongoose from "mongoose";
import { Ingresos } from "../models/ingresos.js";
import { connectDB } from "../config/db_connection.js";

export class IngresosService {
  obtenerIngresos = () => {
    return new Promise((ok, ko) => {
      let isConnected = false;

      connectDB()
        .then(() => {
          isConnected = true;
          return Ingresos.find();
        })
        .then((listaIngresos) => ok(listaIngresos))
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
        .then((ingresoGuardado) => ok(ingresoGuardado))
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
          return Ingresos.findByIdAndUpdate(id, data);
        })
        .then((ingresoEditado) => ok(ingresoEditado))
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
          return Ingresos.findByIdAndDelete(id);
        })
        .then((ingresoEliminado) => ok(ingresoEliminado))
        .catch((error) => ko(error))
        .finally(() => {
          if (isConnected) {
            mongoose.disconnect();
          }
        });
    });
  };
}
