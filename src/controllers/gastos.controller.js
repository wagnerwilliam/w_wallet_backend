import { validateOrThrow } from "../validations/validationHelper.js";

/**
 * Controlador de Gastos.
 *
 * Responsabilidad:
 * - Gestionar endpoints de gastos (CRUD)
 * - Validar datos de entrada usando la capa de validaciones
 * - Delegar lógica de negocio al service
 * - Manejar respuestas HTTP y errores
 */

export class GastosController {
  constructor(GastosService, GastosValidations) {
    this._gastosService = GastosService;
    this._gastosValidations = GastosValidations;
  }

  obtener = async (request, response) => {
    try {
      let { user_id } = request;
      const gastos = await this._gastosService.obtenerGastos(user_id);
      return response.json(gastos);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  crear = async (request, response, next) => {
    try {
      let { user_id } = request;
      validateOrThrow(this._gastosValidations.validateCreateData(request.body));

      const gasto = await this._gastosService.crearGasto({
        ...request.body,
        user_id,
      });

      return response.status(201).json(gasto);
    } catch (error) {
      return next(error);
    }
  };

  editar = async (request, response, next) => {
    try {
      let { user_id } = request;
      const { id } = request.params;

      validateOrThrow(
        this._gastosValidations.validateUpdateData(id, request.body),
      );

      let { matchedCount } = await this._gastosService.editarGasto(
        id,
        request.body,
        user_id,
      );

      if (!matchedCount) {
        return next();
      }

      return response.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  };

  eliminar = async (request, response, next) => {
    try {
      let { user_id } = request;
      const { id } = request.params;

      validateOrThrow(this._gastosValidations.validateDeleteData(id));

      let result = await this._gastosService.eliminarGasto(id, user_id);

      if (!result.deletedCount) {
        return response.error(404, `El Id: ${id} no existe.`);
      }

      return response.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  };
}
