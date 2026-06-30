import express from "express";
import cors from "cors";
import categoriasRouter from "./src/routes/categorias.routes.js";
import ingresosRouter from "./src/routes/ingresos.route.js";
import gastosRouter from "./src/routes/gastos.route.js";
import {
  globalMiddleware,
  globalMiddlewareNotFound,
} from "./src/middlewares/global.js";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/ingresos", ingresosRouter);
server.use("/api/gastos", gastosRouter);
server.use("/api/categorias", categoriasRouter);

server.use(globalMiddleware);
server.use(globalMiddlewareNotFound);

server.get("/", async (request, response) => {
  response.json({ message: "Hola mundo." });
});

server.listen(process.env.PORT, () => {
  console.log("Servidor en ejecucion.");
});
