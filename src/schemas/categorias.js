import mongoose from "mongoose";
const { Schema } = mongoose;

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
    default: "#0F766E",
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
