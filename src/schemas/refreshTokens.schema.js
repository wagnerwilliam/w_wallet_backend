import { Schema } from "mongoose";

/**
 * Esquema que almacena los Refresh Tokens emitidos a los usuarios.
 *
 * Cada registro representa una sesión autenticada y permite validar,
 * renovar o revocar un Refresh Token cuando el Access Token expira.
 */

export const tokenSchema = Schema({
  user_id: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    set(value) {
      if (!value) return value;

      const fecha = new Date(value);
      const ahora = new Date();

      fecha.setHours(
        ahora.getHours(),
        ahora.getMinutes(),
        ahora.getSeconds(),
        ahora.getMilliseconds(),
      );

      return fecha;
    },
  },
  expires_at: {
    type: Date,
  },
  revoked_at: {
    type: Date,
  },
});
