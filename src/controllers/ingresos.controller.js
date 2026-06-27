export class IngresosController {
  constructor(IngresosService) {
    this._ingresosService = IngresosService;
  }

  obtener = async (request, response) => {
    try {
      // if (!name || !type || !user_id) {
      //     return res.status(400).json({ error: "Faltan campos obligatorios" });
      // }

      const resultado = await this._ingresosService.obtenerIngresos();
      return response.json(resultado);

    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  crear = async (request, response) => {
    try {
      const { name, value, user_id, category_id } = request.body;

      // if (!name || !type || !user_id) {
      //     return res.status(400).json({ error: "Faltan campos obligatorios" });
      // }
      
      const resultado = await this._ingresosService.crearIngreso({
        name,
        value,
        user_id,
        category_id,
      });

      return response.status(201).json(resultado);

    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  editar = async (request, response) => {
    try {
      const { id } = request.params;
      const { name, value, muser_id, category_id } = request.body;

      // if (!name || !type || !user_id) {
      //     return res.status(400).json({ error: "Faltan campos obligatorios" });
      // }

      const resultado = await this._ingresosService.editarIngreso(
        id,
        request.body,
      );
      return response.sendStatus(204);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  eliminar = async (request, response) => {
    try {
      const { id } = request.params;

      // if (!name || !type || !user_id) {
      //     return res.status(400).json({ error: "Faltan campos obligatorios" });
      // }

      await this._ingresosService.eliminarIngreso(id);
      return response.sendStatus(204);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };
}
