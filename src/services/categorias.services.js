import { Categorias } from "../models/categorias.model.js";

/**
 * Servicio encargado de manejar todas las operaciones
 * relacionadas con la colección "Categorias" en MongoDB.
 *
 * Responsabilidades:
 * - Conectar a la base de datos
 * - Ejecutar operaciones CRUD
 * - Retornar resultados o errores al controlador
 *
 * Nota: Cada método abre y cierra la conexión a MongoDB
 * para evitar conexiones persistentes innecesarias.
 */
export class CategoriasService {
  async obtenerCategorias(user_id) {
    return await Categorias.find({ user_id });
  }

  async crearCategoria(data) {
    const categoria = new Categorias(data);
    return await categoria.save();
  }

  async editarCategoria(id, data, user_id) {
    return await Categorias.updateOne(
      { _id: id, user_id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );
  }

  eliminarCategoria(id, user_id) {
    return Categorias.deleteOne({
      _id: id,
      user_id,
    });
  }
}
