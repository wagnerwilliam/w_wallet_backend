/**
 * Middleware global de manejo de errores en la aplicación.
 *
 * Este middleware captura cualquier error lanzado en los controladores
 * o servicios y centraliza la respuesta HTTP.
 */

export const globalMiddleware = (error, request, response, next) => {
  const statusCode = error.status || 500;

  response.status(statusCode).json({
    error: error.message || "Error interno del servidor",
    detalles: error.details || null,
  });
};

/**
 * Middleware para rutas o no encontradas (404 handler).
 *
 * Se ejecuta cuando ninguna ruta coincide con la solicitud.
 */

export const globalMiddlewareNotFound = (rquest, response) => {
  response.status(404);
  response.json({ error: "Recurso no encontrado" });
};
