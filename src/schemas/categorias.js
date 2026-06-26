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
    required: false,
  },
  user_id: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
  },
});
