import { Schema } from "mongoose";

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
