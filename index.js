import express from "express";
import cors from "cors";
import categoriasRouter from "./src/routes/categorias.routes.js";

const server = express();

server.use(express.json());
server.use(cors());

server.use("/api/categorias", categoriasRouter);

server.get("/", async (request, response) => {
  response.json({ message: "Hola mundo." });
});

server.listen(process.env.PORT, () => {
  console.log("Servidor en ejecucion.");
});
