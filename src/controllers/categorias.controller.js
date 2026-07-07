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
      let { user_id } = request;
      const categorias =
        await this._categoriasService.obtenerCategorias(user_id);
      return response.json(categorias);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  crear = async (request, response, next) => {
    try {
      const { user_id } = request;

      validateOrThrow(
        this._categoriasValidations.validateCreateData(request.body),
      );

      let categoria = await this._categoriasService.crearCategoria({
        ...request.body,
        user_id,
      });

      return response.status(201).json(categoria);
    } catch (error) {
      return next(error);
    }
  };

  editar = async (request, response, next) => {
    try {
      const { user_id } = request;
      const { id } = request.params;

      validateOrThrow(
        this._categoriasValidations.validateUpdateData(id, request.body),
      );

      let { matchedCount } = await this._categoriasService.editarCategoria(
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

      validateOrThrow(this._categoriasValidations.validateDeleteData(id));

      let result = await this._categoriasService.eliminarCategoria(id, user_id);

      if (!result.deletedCount) {
        return response.error(404, `El Id: ${id} no existe.`);
      }

      return response.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  };
}

// categorias por defecto para cundo cada usuario se registre:

// Ingresos
// | Nombre            | Descripción                                        |
// | ----------------- | -------------------------------------------------- |
// | 💼 Trabajo        | Salario, nómina, honorarios, pagos por servicios.  |
// | 💰 Ventas         | Venta de productos o servicios.                    |
// | 📈 Inversiones    | Dividendos, intereses, rentabilidad.               |
// | 🎁 Regalos        | Dinero recibido de familiares o amigos.            |
// | 📦 Otros ingresos | Cualquier ingreso que no encaje en las anteriores. |

// Gastos
// | Nombre          | Descripción                                     |
// | --------------- | ----------------------------------------------- |
// | 🛒 Alimentación | Supermercado, restaurantes, comida.             |
// | 🏠 Vivienda     | Alquiler, hipoteca, servicios del hogar.        |
// | 🚗 Transporte   | Combustible, transporte público, mantenimiento. |
// | 🎬 Ocio         | Streaming, cine, viajes, entretenimiento.       |
// | 📦 Otros gastos | Gastos ocasionales o sin categoría específica.  |
