import mongoose from "mongoose";
import { connectDB } from "../config/db_connection.js";
import { Usuarios } from "../models/usuarios.js";

export class UsuariosService {
  registerUser = async (data) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          const nuevoUsuario = new Usuarios(data);
          return nuevoUsuario.save();
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

  checkExists = ({ email, username }) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          return Usuarios.findOne({
            $or: [{ email }, { username }],
          });
        })
        .then((usuario) => ok(usuario))
        .catch((error) => ko(error))
        .finally(() => {
          if (isConnected) {
            mongoose.disconnect();
          }
        });
    });
  };
}
