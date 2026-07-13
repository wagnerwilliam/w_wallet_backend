export class MetasController {
  constructor(MetasService) {
    this._metasService = MetasService;
  }

  obtener = async (request, response) => {
    try {
      let { user_id } = request;
      const metas = await this._metasService.obtenerMetas(user_id);
      return response.json(metas);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  crear = async (request, response, next) => {
    try {
      let { user_id } = request;

      const meta = await this._metasService.crearMeta({
        ...request.body,
        user_id,
      });

      return response.status(201).json(meta);
    } catch (error) {
      return next(error);
    }
  };

  editar = async (request, response, next) => {
    try {
      const { user_id } = request;
      const { id } = request.params;

      let { matchedCount } = await this._metasService.editarMeta(
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

  agregarAhorro = async (request, response, next) => {
    try {
      const { user_id } = request;
      const { id } = request.params;

      let { matchedCount } = await this._metasService.agregarAhorro(
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

  detalle = async (request, response, next) => {
    try {
      let { user_id } = request;

      let { id } = request.params;

      const meta = await this._metasService.obtenerMeta(id, user_id);

      return response.status(201).json(meta);
    } catch (error) {
      return next(error);
    }
  };
}
