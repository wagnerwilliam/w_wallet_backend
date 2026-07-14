import { Schema } from "mongoose";

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
