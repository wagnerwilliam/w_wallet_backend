import { crearCategoriaValidation } from "../validators/categorias.validators.js";

export class CategoriasController {
  constructor(CategoriasService) {
    this._categoriasService = CategoriasService;
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
      const validacion = crearCategoriaValidation(request.body);

      if (!validacion.isValid) {
        const errorValidacion = new Error(
          "Errores de validación en el formulario",
        );
        errorValidacion.status = 400; // Definimos que es un error de cliente
        errorValidacion.detalles = validacion.errors; // Adjuntamos los mensajes

        return next(errorValidacion); // Redirige al middleware global e interrumpe el código
      }

      let { name, type, color, user_id } = request.body;

      let resultado = await this._categoriasService.crearCategoria({
        name,
        type,
        color,
        user_id,
      });

      return response.status(201).json(resultado);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  // server.post("/nuevo", async (request, response, next) => {

  //   //asegurar que r, g, b estan presentes en request.body
  //   //asegurar que r, g, b son enteros entre 0 y 255
  //   //en caso de error next(true)

  //   let { r, g, b } = request.body;
  //   let rgb = [r,g,b];
  //   let i = 0;
  //   let valido = true;

  //   while (valido && i < rgb.length) {
  //       valido = /^\d{1,3}$/.test(rgb[i]) && Number(rgb[i]) <= 255;
  //       i++;
  //   }

  //   if (!valido) {
  //       return next(true)
  //   }

  //   try {
  //       let _id = await crearColor({r, g, b, user_id: request.user});
  //       response.status(201);
  //       response.json({ _id });

  //   } catch (error) {
  //       response.status(500);
  //       response.json({ error: "error en el servidor" });
  //   }

  // });

  editar = async (request, response) => {
    try {
      const { id } = request.params;
      const { name, type, color, user_id } = request.body;

      // if (!name || !type || !user_id) {
      //     return res.status(400).json({ error: "Faltan campos obligatorios" });
      // }

      const resultado = await this._categoriasService.editarCategoria(
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

      await this._categoriasService.eliminarCategoria(id);
      return response.sendStatus(204);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };
}
