import mongoose from "mongoose";
import { connectDB } from "../config/db_connection.js";
import { Gastos } from "../models/gastos.js";

export class GastosService {
  obtenerGastos = () => {
    return new Promise((ok, ko) => {
      let isConnected = false;

      connectDB()
        .then(() => {
          isConnected = true;
          return Gastos.find();
        })
        .then((listaGastos) => ok(listaGastos))
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
        .then((gastoGuardado) => ok(gastoGuardado))
        .catch((error) => ko(error))
        .finally(() => {
          if (isConnected) {
            mongoose.disconnect();
          }
        });
    });
  };

  editarGasto = (id, data) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          return Gastos.findByIdAndUpdate(id, data);
        })
        .then((gastoEditado) => ok(gastoEditado))
        .catch((error) => ko(error))
        .finally(() => {
          if (isConnected) {
            mongoose.disconnect();
          }
        });
    });
  };

  eliminarGasto = (id) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          return Gastos.findByIdAndDelete(id);
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
}
