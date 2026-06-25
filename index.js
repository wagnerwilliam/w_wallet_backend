import express from "express";
const server = express();
import { Cat } from "./src/models/categorias.js";

server.get("/", async (request, response) => {
  const kitty = new Cat({ name: "Zildjian" });
  kitty.save().then(() => console.log("meow"));

  response.json({ message: "Hola mundo." });
});

server.listen(process.env.PORT);
