import mongoose from "mongoose";
const { Schema } = mongoose;

/**
 * Schema de Mongoose para Categorías.
 *
 * Representa las categorías utilizadas para clasificar ingresos y gastos.
 * Cada categoría pertenece a un usuario y puede estar activa o inactiva.
 */

export const categoriasSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["ingreso", "gasto"],
  },
  color: {
    type: String,
    required: false,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
  },
});
