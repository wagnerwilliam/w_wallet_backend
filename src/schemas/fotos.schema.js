import { Schema } from "mongoose";

/**
 * Esquema que representa la fotografía de perfil de un usuario.
 *
 * Cada usuario puede tener asociada una única imagen almacenada
 * en un servicio externo (Cloudinary), cuya URL se guarda en la base
 * de datos junto con información de auditoría.
 */

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
