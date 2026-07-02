import { validateOrThrow } from "../validations/validationHelper.js";

/**
 * Controlador de Ingresos.
 *
 * Responsabilidad:
 * - Manejar endpoints CRUD de ingresos
 * - Validar datos de entrada mediante capa de validaciones
 * - Delegar lógica de negocio al service
 * - Gestionar respuestas HTTP y errores
 */

export class IngresosController {
  constructor(IngresosService, IngresoValidations) {
    this._ingresosService = IngresosService;
    this._ingresoValidations = IngresoValidations;
  }

  obtener = async (request, response) => {
    try {
      let { user_id } = request;
      const resultado = await this._ingresosService.obtenerIngresos(user_id);
      return response.json(resultado);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  crear = async (request, response, next) => {
    try {
      let { user_id } = request;

      validateOrThrow(
        this._ingresoValidations.validateCreateData(request.body),
      );

      const resultado = await this._ingresosService.crearIngreso({
        ...request.body,
        user_id,
      });

      return response.status(201).json(resultado);
    } catch (error) {
      return next(error);
    }
  };

  editar = async (request, response, next) => {
    try {
      const { user_id } = request;
      const { id } = request.params;

      validateOrThrow(
        this._ingresoValidations.validateUpdateData(id, request.body),
      );

      let { matchedCount } = await this._ingresosService.editarIngreso(
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
      const { user_id } = request;
      const { id } = request.params;

      validateOrThrow(this._ingresoValidations.validateDeleteData(id));

      let ingreso = await this._ingresosService.eliminarIngreso(id, user_id);

      if (!ingreso) {
        return next();
      }

      return response.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  };
}
