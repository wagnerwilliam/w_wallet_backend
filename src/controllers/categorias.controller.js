export class CategoriasController {
  constructor(CategoriasService) {
    this._categoriasService = CategoriasService;
  }

  obtener = async (request, response) => {
    try {
      // if (!name || !type || !user_id) {
      //     return res.status(400).json({ error: "Faltan campos obligatorios" });
      // }

      const resultado = await this._categoriasService.obtenerCategorias();
      return response.status(200).json(resultado);

    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  crear = async (request, response) => {
    try {
      const { name, type, user_id } = request.body;

      // if (!name || !type || !user_id) {
      //     return res.status(400).json({ error: "Faltan campos obligatorios" });
      // }

      const resultado = await this._categoriasService.crearCategoria({
        name,
        type,
        user_id,
      });

      return response.status(201).json({ status: "success", data: resultado });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };
}
