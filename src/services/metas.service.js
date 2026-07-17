import { Metas, SavedAmount } from "../models/metas.model.js";
import mongoose from "mongoose";

const { Types } = mongoose;

/**
 * Servicio encargado de gestionar las metas de ahorro.
 *
 * Contiene la lógica de negocio relacionada con la creación,
 * actualización, consulta y resumen de las metas financieras
 * de un usuario.
 */
export class MetasService {
  obtenerMetas = async (user_id) => {
    return await Metas.find({ user_id }).sort({
      created_at: -1,
    });
  };

  crearMeta = (data) => {
    return new Metas(data).save();
  };

  crearImporteAhorrado = (data) => {
    return new SavedAmount(data).save();
  };

  editarMeta = (id, data, user_id) => {
    return Metas.updateOne(
      { _id: id, user_id },
      {
        $set: {
          ...data,
          updated_at: new Date(),
        },
      },
    );
  };

  agregarAhorro = (id, saved, description, user_id) => {
    return Metas.updateOne(
      {
        _id: id,
        user_id,
      },
      {
        $inc: {
          saved,
        },
        $set: {
          description,
          updated_at: new Date(),
        },
      },
    );
  };

  obtenerMeta = async (id, user_id) => {
    return await Metas.findOne({ _id: new Types.ObjectId(id), user_id });
  };

  obtenerResumenMetas = async (user_id) => {
    const [summary] = await Metas.aggregate([
      {
        $match: {
          user_id,
        },
      },
      {
        $group: {
          _id: null,

          activeGoals: {
            $sum: {
              $cond: ["$is_active", 1, 0],
            },
          },

          completedGoals: {
            $sum: {
              $cond: [
                {
                  $gte: ["$saved", "$target"],
                },
                1,
                0,
              ],
            },
          },

          savedAmount: {
            $sum: "$saved",
          },

          remainingAmount: {
            $sum: {
              $max: [
                {
                  $subtract: ["$target", "$saved"],
                },
                0,
              ],
            },
          },
        },
      },
    ]);

    return (
      summary ?? {
        activeGoals: 0,
        completedGoals: 0,
        savedAmount: 0,
        remainingAmount: 0,
      }
    );
  };
}
