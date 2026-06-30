import { validateOrThrow } from "../validations/validationHelper.js";

/**
 * Controlador encargado de manejar las peticiones HTTP
 * relacionadas con "Categorias".
 *
 * Responsabilidades:
 * - Recibir requests HTTP
 * - Validar datos de entrada mediante CategoriasValidations
 * - Delegar lógica al service (CategoriasService)
 * - Manejar respuestas HTTP y errores
 *
 * Nota:
 * Este controlador no contiene lógica de negocio,
 * solo orquesta validación + servicio + respuesta.
 */

export class CategoriasController {
  constructor(CategoriasService, CategoriasValidations) {
    this._categoriasService = CategoriasService;
    this._categoriasValidations = CategoriasValidations;
  }

  obtener = async (request, response) => {
    try {
      const resultado = await this._categoriasService.obtenerCategorias();
      return response.json(resultado);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  crear = async (request, response, next) => {
    try {
      validateOrThrow(
        this._categoriasValidations.validateCreateData(request.body),
      );

      let resultado = await this._categoriasService.crearCategoria(
        request.body,
      );

      return response.status(201).json(resultado);
    } catch (error) {
      return next(error);
    }
  };

  editar = async (request, response, next) => {
    try {
      const { id } = request.params;

      validateOrThrow(
        this._categoriasValidations.validateUpdateData(id, request.body),
      );

      let { matchedCount } = await this._categoriasService.editarCategoria(
        id,
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

  eliminar = async (request, response, next) => {
    try {
      const { id } = request.params;

      validateOrThrow(this._categoriasValidations.validateDeleteData(id));

      let categoria = await this._categoriasService.eliminarCategoria(id);

      if (!categoria) {
        return next();
      }

      return response.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  };
}
