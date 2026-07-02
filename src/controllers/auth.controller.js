import { validateOrThrow } from "../validations/validationHelper.js";
import { signToken } from "../utils/auth.js";
import { authorizationMiddleware } from "../middlewares/global.js";
import bcrypt from "bcrypt";

export class AuthController {
  constructor(UsuarioService, UsuriosValidations, AuthValidations) {
    this._usuariosService = UsuarioService;
    this._usuariosValidations = UsuriosValidations;
    this._authValidations = AuthValidations;
  }

  login = async (request, response, next) => {
    try {
      let data = request.body;

      //valida datos enviados
      validateOrThrow(this._usuariosValidations.validateRequiredFields(data));

      //obtiene usuario registrado
      const resultado = await this._usuariosService.checkExists(data);

      //si el el usuario no existe devuelve 401
      validateOrThrow(this._usuariosValidations.validateUserExists(resultado));

      //si el ususario existe pero la contraseña es incorrecta devuelve 403
      validateOrThrow(
        await this._authValidations.comparePassword(
          data.password,
          resultado.usuario,
        ),
      );

      let token = signToken(resultado.usuario);

      return response.json({ token });
    } catch (error) {
      return next(error);
    }
  };

  register = async (request, response, next) => {
    try {
      let data = request.body;

      validateOrThrow(this._usuariosValidations.validateCreateData(data));

      const existe = await this._usuariosService.checkExists(data);

      if (existe)
        validateOrThrow(this._usuariosValidations.validateUniqueFields(existe));

      // Considerar agregar a un servicio de Auth
      data.password = await bcrypt.hash(data.password, 10);

      const resultado = await this._usuariosService.registerUser(data);

      return response.status(201).json(resultado);
    } catch (error) {
      return next(error);
    }
  };

  logout = async (request, response, next) => {
    //validar opcion de refresh token.
    try {
      return response.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
