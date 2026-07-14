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
      const { saved, description } = request.body;

      let { matchedCount } = await this._metasService.agregarAhorro(
        id,
        saved,
        description,
        user_id,
      );

      if (!matchedCount) {
        return next();
      }

      // esto deberia ir en una tarea en segundo plano.
      await this._metasService.crearImporteAhorrado({
        meta_id: id,
        user_id,
        amount: saved,
        description,
      });

      return response.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  };

  obtenerResumenMetas = async (request, response) => {
    try {
      let { user_id } = request;
      const resumenMetas =
        await this._metasService.obtenerResumenMetas(user_id);
      return response.json(resumenMetas);
    } catch (error) {
      return response.status(500).json({ error: error.message });
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
