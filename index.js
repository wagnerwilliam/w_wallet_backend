import express from "express";
import cors from "cors";
import categoriasRouter from "./src/routes/categorias.routes.js";
import ingresosRouter from "./src/routes/ingresos.route.js";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/ingresos", ingresosRouter);
server.use("/api/categorias", categoriasRouter);

server.get("/", async (request, response) => {
  response.json({ message: "Hola mundo." });
});

server.listen(process.env.PORT, () => {
  console.log("Servidor en ejecucion.");
});
