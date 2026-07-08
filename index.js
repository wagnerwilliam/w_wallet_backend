import express from "express";
import cors from "cors";
import categoriasRouter from "./src/routes/categorias.route.js";
import dashboardRouter from "./src/routes/dashboard.route.js";
import ingresosRouter from "./src/routes/ingresos.route.js";
import gastosRouter from "./src/routes/gastos.route.js";
import authRouter from "./src/routes/auth.route.js";
import usuariosRouter from "./src/routes/usuarios.route.js";
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

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

await connectDB();
const server = express();

server.use(responseMiddleware);

server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: process.env.CLIENT_APP_URL,
    credentials: true,
  }),
);

server.use(clientKeyMiddleware);

server.use("/api/auth", authRouter);

server.use(authorizationMiddleware);

//server.use("/api/auth/logout", ingresosRouter);
server.use("/api/usuarios/", usuariosRouter);
server.use("/api/dashboard", dashboardRouter);
server.use("/api/ingresos", ingresosRouter);
server.use("/api/gastos", gastosRouter);
server.use("/api/categorias", categoriasRouter);

server.use(globalMiddleware);

server.get("/", async (request, response) => {
  response.json({ message: "Hola mundo." });
});

server.listen(process.env.PORT, () => {
  console.log("Servidor en ejecucion.");
});
