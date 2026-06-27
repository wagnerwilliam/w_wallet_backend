import mongoose from "mongoose";
const { Schema } = mongoose;

export const ingresosSchema = Schema({
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
  },

  updated_at: {
    type: Date,
  },
});
