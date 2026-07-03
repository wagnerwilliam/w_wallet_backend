import jwt from "jsonwebtoken";
/**
 * Middleware global de manejo de errores en la aplicación.
 *
 * Este middleware captura cualquier error lanzado en los controladores
 * o servicios y centraliza la respuesta HTTP.
 */

export const globalMiddleware = (error, request, response, next) => {
  const statusCode = error.status || 500;

  return response.status(statusCode).json({
    error: error.message || "Error interno del servidor",
    details: error.details || null,
  });
};

/**
 * Middleware para rutas o no encontradas (404 handler).
 *
 * Se ejecuta cuando ninguna ruta coincide con la solicitud.
 */

export const clientKeyMiddleware = (request, response, next) => {
  const clientToken = request.headers["client-key"];

  if (!clientToken) {
    return response.status(401).json({
      error: "No autorizado",
      details: {
        clientToken: ["No se encontró el Client-key."],
      },
    });
  }

  if (clientToken !== process.env.CLIENT_KEY) {
    return response.status(401).json({
      error: "No autorizado",
      details: {
        clientToken: ["El Client-key no es válido."],
      },
    });
  }

  next();
};

export const refreshTokenMiddleware = (request, response, next) => {
  const { refreshToken } = request.cookies;

  if (!refreshToken) {
    return response.status(401).json({
      error: "No autorizado",
      details: {
        refreshToken: ["No se encontró el refresh token."],
      },
    });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (error, payload) => {
    if (error) {
      return response.status(401).json({
        error: "No autorizado",
        details: {
          refreshToken: ["El refresh token es inválido o ha expirado."],
        },
      });
    }
    request.refreshToken = refreshToken;
    request.user_id = payload.sub;
    next();
  });
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

  const [scheme, accessToken] = authorization.split(" ");

  if (scheme !== "Bearer" || !accessToken) {
    return response.status(401).json({
      error: "No autorizado",
      details: {
        authorization: [
          "El formato del encabezado Authorization debe ser 'Bearer <accessToken>'.",
        ],
      },
    });
  }

  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (error, payload) => {
    if (error) {
      return response.status(401).json({
        error: "No autorizado",
        details: {
          authorization: ["El accessToken es inválido o ha expirado."],
        },
      });
    }

    request.user_id = payload.sub;
    next();
  });
};

export const responseMiddleware = (request, response, next) => {
  response.error = (status, message, details = null) => {
    return response.status(status).json({
      error: message,
      details,
    });
  };

  response.success = (data, status = 200) => {
    return response.status(status).json(data);
  };

  next();
};
