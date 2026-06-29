export const globalMiddleware = (error, request, response, next) => {
  const statusCode = error.status || 500;

  return response.status(statusCode).json({
    error: error.message || "Error interno del servidor",
    detalles: error.detalles || null, // Aquí se enviarán tus mensajes de name, type, etc.
  });
};
