import { Metas } from "../models/metas.model.js";
import mongoose from "mongoose";

const { Types } = mongoose;

export class MetasService {
  obtenerMetas = async (user_id) => {
    return await Metas.find({ user_id }).sort({
      created_at: -1,
    });
  };

  crearMeta = (data) => {
    return new Metas(data).save();
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

  agregarAhorro = (id, { saved, description }, user_id) => {
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
}
