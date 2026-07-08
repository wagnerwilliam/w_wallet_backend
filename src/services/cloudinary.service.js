import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

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
