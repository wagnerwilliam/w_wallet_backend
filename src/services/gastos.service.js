import { Gastos } from "../models/gastos.model.js";

/**
 * Servicio encargado de gestionar todas las operaciones CRUD
 * relacionadas con la colección de Gastos en la base de datos.
 *
 * Este servicio maneja explícitamente la conexión y desconexión
 * a MongoDB por cada operación para asegurar control de recursos.
 */

export class GastosService {
  obtenerGastos(user_id) {
    return Gastos.find({ user_id });
  }

  crearGasto(data) {
    return new Gastos(data).save();
  }

  editarGasto(id, data, user_id) {
    return Gastos.updateOne(
      { _id: id, user_id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );
  }

  eliminarGasto(id, user_id) {
    return Gastos.deleteOne({
      _id: id,
      user_id,
    });
  }
}
