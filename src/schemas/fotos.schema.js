import { Schema } from "mongoose";

export const photoSchema = Schema({
  url: {
    type: String,
    required: true,
    trim: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
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
  updated_at: {
    type: Date,
  },
});
