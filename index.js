import express from "express";
import cors from "cors";
import categoriasRouter from "./src/routes/categorias.route.js";
import dashboardRouter from "./src/routes/dashboard.route.js";
import ingresosRouter from "./src/routes/ingresos.route.js";
import gastosRouter from "./src/routes/gastos.route.js";
import authRouter from "./src/routes/auth.route.js";
import usuariosRouter from "./src/routes/usuarios.route.js";
import metasRouter from "./src/routes/metas.route.js";
import { responseMiddleware } from "./src/middlewares/global.middleware.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/db_connection.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

import {
  globalMiddleware,
  clientKeyMiddleware,
  authorizationMiddleware,
} from "./src/middlewares/global.middleware.js";

dotenv.config();

/**
 * ------------------------------------------------------------------
 * Configuración de Cloudinary
 * ------------------------------------------------------------------
 *
 * Inicializa el cliente oficial de Cloudinary utilizando las
 * credenciales definidas en las variables de entorno.
 *
 * Esta configuración se realiza una única vez al iniciar la aplicación
 * para que cualquier servicio pueda subir imágenes sin necesidad de
 * volver a configurar el cliente.
 */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Establece la conexión con MongoDB antes de iniciar el servidor.
 */
await connectDB();

/**
 * Instancia principal de la aplicación Express.
 */
const server = express();

/**
 * ------------------------------------------------------------------
 * Middlewares globales
 * ------------------------------------------------------------------
 */

/**
 * Agrega los métodos response.success() y response.error()
 * para estandarizar todas las respuestas HTTP.
 */
server.use(responseMiddleware);

/**
 * Permite recibir cuerpos JSON.
 */
server.use(express.json());

/**
 * Permite leer las cookies enviadas por el navegador.
 * Se utiliza principalmente para obtener el Refresh Token.
 */
server.use(cookieParser());

/**
 * Configuración de CORS.
 *
 * Permite solicitudes únicamente desde el origen configurado
 * en las variables de entorno y habilita el envío de cookies.
 */
server.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

/**
 * Valida el Client-Key enviado por el frontend.
 *
 * Este middleware protege toda la API evitando solicitudes
 * provenientes de clientes no autorizados.
 */
server.use(clientKeyMiddleware);

/**
 * ------------------------------------------------------------------
 * Rutas públicas
 * ------------------------------------------------------------------
 *
 * Estas rutas no requieren autenticación mediante Access Token.
 */
server.use("/api/auth", authRouter);

/**
 * ------------------------------------------------------------------
 * Middleware de autenticación
 * ------------------------------------------------------------------
 *
 * Todas las rutas registradas a partir de este punto requieren
 * un Access Token válido.
 */
server.use(authorizationMiddleware);

/**
 * ------------------------------------------------------------------
 * Rutas protegidas
 * ------------------------------------------------------------------
 */
server.use("/api/usuarios/", usuariosRouter);
server.use("/api/metas/", metasRouter);
server.use("/api/dashboard", dashboardRouter);
server.use("/api/ingresos", ingresosRouter);
server.use("/api/gastos", gastosRouter);
server.use("/api/categorias", categoriasRouter);

/**
 * Middleware global para el manejo centralizado de errores.
 *
 * Debe registrarse al final de todas las rutas.
 */
server.use(globalMiddleware);

server.get("/", async (request, response) => {
  response.json({ message: "Hola mundo." });
});

/**
 * Inicia el servidor HTTP.
 */
server.listen(process.env.PORT, () => {
  console.log("Servidor en ejecucion.");
});
