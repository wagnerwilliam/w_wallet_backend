import { Usuarios } from "../models/usuarios.model.js";
import mongoose from "mongoose";

/**
 * Servicio encargado de gestionar la información de los usuarios.
 *
 * Contiene la lógica relacionada con el registro, validación,
 * consulta y actualización de perfiles de usuario.
 */
export class UsuariosService {
  registerUser(data) {
    return new Usuarios(data).save();
  }

  async checkExists({ email, username }) {
    const usuario = await Usuarios.findOne({
      $or: [{ email }, { username }],
    }).select("+password");

    return {
      usuario,
      email: usuario?.email === email,
      username: usuario?.username === username,
    };
  }

  /**
   * Obtiene el perfil completo de un usuario.
   *
   * Se utiliza una agregación para unir la información del usuario
   * con su fotografía de perfil almacenada en la colección `fotos`.
   *
   * Si el usuario no tiene fotografía registrada, el campo `photo`
   * será `null`.
  */

  detalleUsuario = async (user_id) => {
    const [usuario] = await Usuarios.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(user_id),
        },
      },
      {
        $lookup: {
          from: "fotos",
          localField: "_id",
          foreignField: "user_id",
          as: "photo",
        },
      },
      {
        $unwind: {
          path: "$photo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          full_name: 1,
          email: 1,
          username: 1,
          birth_date: 1,
          is_active: 1,
          created_at: 1,
          updated_at: 1,
          photo: "$photo.url",
        },
      },
    ]);

    return usuario;
  };

  editarUsuario = async (user_id, data) => {
    return Usuarios.updateOne(
      { _id: user_id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );
  };
}
