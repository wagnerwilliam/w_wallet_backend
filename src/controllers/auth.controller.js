import { validateOrThrow } from "../validations/validationHelper.js";
import bcrypt from "bcrypt";

export class AuthController {
  constructor(UsuarioService, UsuriosValidations) {
    this._usuariosService = UsuarioService;
    this._usuriosValidations = UsuriosValidations;
  }

  // login = async (request, response) => {
  //   try {
  //     const resultado = await this._gastosService.obtenerGastos();
  //     return response.json(resultado);
  //   } catch (error) {
  //     return response.status(500).json({ error: error.message });
  //   }
  // };

  register = async (request, response, next) => {
    try {
      let data = request.body;

      validateOrThrow(this._usuriosValidations.validateCreateData(data));

      const existe = await this._usuariosService.checkExists(data);

      validateOrThrow(this._usuriosValidations.validateUniqueFields(existe));

      // Considerar agregar a un servicio de Auth
      data.password = await bcrypt.hash(data.password, 10);

      const resultado = await this._usuariosService.registerUser(data);

      return response.status(201).json(resultado);
    } catch (error) {
      return next(error);
    }
  };

  // logout = async (request, response, next) => {
  //   try {
  //     const { id } = request.params;

  //     validateOrThrow(
  //       this._gastosValidations.validateUpdateData(id, request.body),
  //     );

  //     let { matchedCount } = await this._gastosService.editarGasto(
  //       id,
  //       request.body,
  //     );

  //     if (!matchedCount) {
  //       return next();
  //     }

  //     return response.sendStatus(204);
  //   } catch (error) {
  //     return next(error);
  //   }
  // };
}
