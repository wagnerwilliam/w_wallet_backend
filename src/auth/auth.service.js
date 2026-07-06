import mongoose from "mongoose";
import { connectDB } from "../config/db_connection.js";
import { Token } from "../models/token.model.js";

export class AuthService {
  guardarToken = (data) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          const nuevoRefreshToken = new Token(data);
          return nuevoRefreshToken.save();
        })
        .then((response) => ok(response.token))
        .catch((error) => ko(error))
        .finally(() => {
          if (isConnected) {
            mongoose.disconnect();
          }
        });
    });
  };

  eliminarToken = (token, user_id) => {
    return new Promise((ok, ko) => {
      let isConnected = false;
      connectDB()
        .then(() => {
          isConnected = true;
          return Token.findOneAndDelete({ token, user_id });
        })
        .then((deletedToken) => ok(deletedToken))
        .catch((error) => ko(error))
        .finally(() => {
          if (isConnected) {
            mongoose.disconnect();
          }
        });
    });
  };
}
