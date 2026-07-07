import mongoose from "mongoose";

export const usuariosSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: false,
    trim: true,
    minlength: 3,
    maxlength: 100,
    default: "",
  },
  birth_date: {
    type: Date,
    required: false,
    default: null,
  },
  email: {
    //va
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    //va
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    //va
    type: String,
    required: true,
    select: false,
  },
  is_active: {
    type: Boolean,
    default: true,
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
