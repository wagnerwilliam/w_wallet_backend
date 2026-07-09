import { validateOrThrow } from "../validations/validationHelper.js";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.js";
import bcrypt from "bcrypt";
import { defaultCategorias } from "../utils/categorias.js";

export class AuthController {
  constructor(
    UsuarioService,
    UsuriosValidations,
    AuthValidations,
    AuthService,
    CategoriasService,
  ) {
    this._usuariosService = UsuarioService;
    this._usuariosValidations = UsuriosValidations;
    this._authValidations = AuthValidations;
    this._authService = AuthService;
    this._categoriasService = CategoriasService;
  }

  login = async (request, response, next) => {
    try {
      let data = request.body;

      //valida datos enviados
      validateOrThrow(this._usuariosValidations.validateRequiredFields(data));

      //obtiene usuario registrado
      let { usuario } = await this._usuariosService.checkExists(data);

      //si el el usuario no existe devuelve 401
      validateOrThrow(this._usuariosValidations.validateUserExists(usuario));

      //si el ususario existe pero la contraseña es incorrecta devuelve 403
      validateOrThrow(
        await this._authValidations.comparePassword(
          data.password,
          usuario.password,
        ),
      );

      const accessToken = generateAccessToken(usuario);
      const refreshToken = generateRefreshToken(usuario);

      //guardar refresh token en mongo.
      let savedRefreshToken = await this._authService.guardarToken({
        token: refreshToken,
        user_id: usuario._id,
      });

      response.cookie("refreshToken", savedRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return response.json({
        accessToken,
        usuario,
      });
    } catch (error) {
      return next(error);
    }
  };

  refresh = async (request, response, next) => {
    try {
      const { refreshToken, user_id } = request;

      //quiza merezca la pena validar la existencia en bd antes de eliminar

      // servicio en auth para eliminar token.
      await this._authService.eliminarToken(refreshToken, user_id);

      // generar nuevo acces token y refresh token
      const newAccessToken = generateAccessToken({ _id: user_id });
      const newRefreshToken = generateRefreshToken({ _id: user_id });

      ///guardar refresh token
      let savedNewRefreshToken = await this._authService.guardarToken({
        token: newRefreshToken,
        user_id,
      });

      //agrega refresh token a las cookies
      response.cookie("refreshToken", savedNewRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return response.json({
        newAccessToken,
      });
    } catch (error) {
      next(error);
    }
  };

  register = async (request, response, next) => {
    try {
      let data = request.body;

      validateOrThrow(this._usuariosValidations.validateCreateData(data));

      const existe = await this._usuariosService.checkExists(data);

      if (existe)
        validateOrThrow(this._usuariosValidations.validateUniqueFields(existe));

      data.password = await bcrypt.hash(data.password, 10);

      const resultado = await this._usuariosService.registerUser(data);
      
      // validar la posibilidad de agregar una tarea en 2 plano para crear categorias por defecto para cada usuario.
      // usando BullMQ, redis
      //de momento se hace directamente.
      for (let i = 0; i < defaultCategorias.length; i++) {
        const categoria = defaultCategorias[i];
        categoria.user_id = String(resultado._id);
        await this._categoriasService.crearCategoria(categoria);
      }

      return response.status(201).json(resultado);
    } catch (error) {
      return next(error);
    }
  };

  logout = async (request, response, next) => {
    try {
      //obtener refresh token
      const { refreshToken, user_id } = request;

      //eliminar de base de datos
      await this._authService.eliminarToken(refreshToken, user_id);

      // limpiar cookie.
      response.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      // lo demas se trabaja en el cliente.
      return response.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
