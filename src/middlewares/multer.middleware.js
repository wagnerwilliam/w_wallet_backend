import multer from "multer";

/**
 * Configuración de Multer para la recepción de archivos.
 *
 * Se utiliza el almacenamiento en memoria (`memoryStorage`) para
 * mantener temporalmente los archivos en un `Buffer` durante la
 * petición, evitando escribirlos en el sistema de archivos.
 *
 * Esta configuración es ideal cuando los archivos se envían
 * inmediatamente a un servicio externo, como Cloudinary.
 */

export const upload = multer({
  storage: multer.memoryStorage(),
});
