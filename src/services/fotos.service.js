import { Fotos } from "../models/fotos.model.js";

export class FotosService {
  guardarFoto(data) {
    return new Fotos(data).save();
  }

  guardarOActualizarFoto(user_id, url) {
    return Fotos.updateOne(
      { user_id },
      {
        $set: {
          url,
          updated_at: new Date(),
        },
        $setOnInsert: {
          user_id,
          created_at: new Date(),
        },
      },
      {
        upsert: true,
      },
    );
  }
}
