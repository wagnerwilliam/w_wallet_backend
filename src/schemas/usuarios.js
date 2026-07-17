import mongoose from "mongoose";

/**
 * Esquema que representa a un usuario de la aplicación.
 *
 * Almacena la información necesaria para la autenticación,
 * el perfil del usuario y el estado de su cuenta.
 */

export const usuariosSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: false,
    trim: true,
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
