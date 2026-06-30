import mongoose from "mongoose";
const { Schema } = mongoose;

/**
 * Schema de Mongoose para Gastos.
 *
 * Representa los registros de gastos realizados por un usuario.
 * Cada gasto pertenece a una categoría y contiene información de valor y estado.
 */

export const gastosSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: Number,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  category_id: {
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
        ahora.getMilliseconds()
      );

      return fecha;
    },
  },

  updated_at: {
    type: Date,
  },
});
