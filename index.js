import express from "express";
import cors from "cors";
import categoriasRouter from "./src/routes/categorias.route.js";
import dashboardRouter from "./src/routes/dashboard.route.js";
import ingresosRouter from "./src/routes/ingresos.route.js";
import gastosRouter from "./src/routes/gastos.route.js";
import authRouter from "./src/routes/auth.route.js";
import { responseMiddleware } from "./src/middlewares/global.middleware.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/db_connection.js";

import {
  globalMiddleware,
  clientKeyMiddleware,
  authorizationMiddleware,
} from "./src/middlewares/global.middleware.js";

const server = express();
await connectDB();

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
