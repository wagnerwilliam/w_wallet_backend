import { Ingresos } from "../models/ingresos.model.js";

/**
 * Servicio encargado de gestionar operaciones CRUD de Ingresos.
 * Maneja conexión directa con MongoDB mediante Mongoose.
 */

export class IngresosService {
  obtenerIngresos(user_id) {
    return Ingresos.find({ user_id });
  }

  crearIngreso(data) {
    return new Ingresos(data).save();
  }

  editarIngreso(id, data, user_id) {
    return Ingresos.updateOne(
      { _id: id, user_id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );
  }

  eliminarIngreso(id, user_id) {
    return Ingresos.deleteOne({
      _id: id,
      user_id,
    });
  }
}
