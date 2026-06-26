import mongoose from "mongoose";
import { Categorias } from "../models/categorias.js";
import { connectDB } from "../config/db_connection.js";

export class CategoriasService {
  obtenerCategorias = () => {
    return new Promise((ok, ko) => {
      let isConnected = false;

      connectDB()
        .then(() => {
          isConnected = true;
          return Categorias.find();
        })
        .then((listaCategorias) => {
          ok(listaCategorias);
        })
        .catch((error) => {
          ko(error);
        })
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
        .then((savedKitty) => {
          ok(savedKitty);
        })
        .catch((error) => {
          ko(error);
        })
        .finally(() => {
          if (isConnected) {
            mongoose.disconnect();
          }
        });
    });
  };
}
