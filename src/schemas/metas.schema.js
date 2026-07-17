import { Schema } from "mongoose";

/**
 * Esquema que representa una meta de ahorro creada por un usuario.
 *
 * Cada meta almacena el objetivo económico, el importe acumulado,
 * información descriptiva y los datos necesarios para su seguimiento.
 */

export const metasSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  target: {
    type: Number,
    required: true,
  },
  saved: {
    type: Number,
    required: false,
    default: 0,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  target_date: {
    type: Date,
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
  color: {
    type: String,
    required: false,
  },
  user_id: {
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
  updated_at: {
    type: Date,
  },
});

/**
 * Esquema que registra cada aporte realizado a una meta de ahorro.
 *
 * Permite mantener un historial de todos los movimientos realizados
 * por el usuario para conocer cuándo y cuánto dinero se añadió.
 */

export const savedAmountSchema = Schema({
  amount: {
    type: Number,
    required: false,
    default: 0,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  meta_id: {
    type: String,
    required: true,
  },
  user_id: {
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
  updated_at: {
    type: Date,
  },
});
