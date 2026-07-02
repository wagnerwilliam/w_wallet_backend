import jwt from "jsonwebtoken";
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
    details: error.details || null,
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

export const clientTokenMiddleware = (request, response, next) => {
  const clientToken = request.headers["client-token"];

  if (!clientToken) {
    return response.status(401).json({
      error: "No autorizado",
      details: {
        clientToken: ["No se encontró el Client-Token."],
      },
    });
  }

  if (clientToken !== process.env.CLIENT_APP_TOKEN) {
    return response.status(401).json({
      error: "No autorizado",
      details: {
        clientToken: ["El Client-Token no es válido."],
      },
    });
  }

  next();
};

export const authorizationMiddleware = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({
      error: "No autorizado",
      details: {
        authorization: ["No se encontró el token de autenticación."],
      },
    });
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return response.status(401).json({
      error: "No autorizado",
      details: {
        authorization: [
          "El formato del encabezado Authorization debe ser 'Bearer <token>'.",
        ],
      },
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
    if (error) {
      return response.status(401).json({
        error: "No autorizado",
        details: {
          authorization: ["El token es inválido o ha expirado."],
        },
      });
    }

    request.user = payload.id;
    next();
  });
};
