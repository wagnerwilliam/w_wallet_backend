/**
 * Controlador encargado de gestionar las operaciones relacionadas con el
 * usuario autenticado, incluyendo la consulta y actualización
 * de su información personal y fotografía de perfil.
 */
export class UsuariosController {
  constructor(UsuariosService, CloudinaryService, FotosService) {
    this._usuariosService = UsuariosService;
    this._cloudinaryService = CloudinaryService;
    this._fotosService = FotosService;
  }

  detalle = async (request, response) => {
    try {
      let { user_id } = request;
      const usuario = await this._usuariosService.detalleUsuario(user_id);

      return response.json(usuario);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };

  editar = async (request, response, next) => {
    try {
      const { user_id } = request;
      let { full_name, birth_date } = request.body;

      if (request.file) {
        // subir imagen a Cloudinary
        // validar que ocurre si se sube un pdf o archivo extraño.
        let { url } = await this._cloudinaryService.upload(request.file);
        // guardar en colección photos
        await this._fotosService.guardarOActualizarFoto(user_id, url);
      }

      let { matchedCount } = await this._usuariosService.editarUsuario(
        user_id,
        {
          full_name,
          birth_date,
        },
      );

      if (!matchedCount) {
        return next();
      }

      return response.sendStatus(204);
    } catch (error) {
      return next(error);
    }
  };
}
