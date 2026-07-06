import { Usuarios } from "../models/usuarios.model.js";

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
}
