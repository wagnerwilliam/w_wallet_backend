import { Token } from "../models/token.model.js";

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
