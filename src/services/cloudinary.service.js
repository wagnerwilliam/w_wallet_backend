import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

/**
 * Servicio encargado de gestionar la carga de archivos en Cloudinary.
 * Centraliza la integración con el proveedor de almacenamiento para
 * mantener esta lógica desacoplada del resto de la aplicación.
 */

export class CloudinaryService {
  async upload(file) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "usuarios",
        },
        (error, result) => {
          if (error) return reject(error);

          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  }
}
