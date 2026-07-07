import { validateOrThrow } from "../validations/validationHelper.js";

export class UsuariosController {
  constructor(UsuariosService, IngresoValidations) {
    this._usuariosService = UsuariosService;
    //this._ingresoValidations = IngresoValidations;
  }

  detalle = async (request, response) => {
    try {
      let { user_id } = request;
      const usuario = await this._usuariosService.detalleUsuario(user_id);
      return response.json(usuario);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  editar = async (request, response, next) => {
    try {
      const { user_id } = request;
      let { matchedCount } = await this._usuariosService.editarUsuario(
        user_id,
        request.body,
      );
      if (!matchedCount) {
        return next();
      }
      return response.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  };
}
