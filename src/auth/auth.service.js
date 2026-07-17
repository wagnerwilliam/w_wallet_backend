import { Token } from "../models/token.model.js";

/**
 * Servicio encargado de la gestión de los Refresh Tokens.
 *
 * Proporciona las operaciones necesarias para persistir y revocar
 * los Refresh Tokens utilizados durante el proceso de autenticación.
 *
 * El almacenamiento de los tokens en la base de datos permite
 * implementar una estrategia de revocación y rotación de tokens,
 * aumentando la seguridad de la aplicación.
 */

export class AuthService {
  guardarToken = async (data) => {
    const nuevoRefreshToken = new Token(data);

    const response = await nuevoRefreshToken.save();

    return response.token;
  };

  eliminarToken = async (token, user_id) => {
    return await Token.findOneAndDelete({
      token,
      user_id,
    });
  };
}
