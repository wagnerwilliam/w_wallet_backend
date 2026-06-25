import express from "express";
import dotenv from "dotenv";
dotenv.config();


const server = express();



server.get("/", (request, response) => {

    response.json({message: "Hola mundo."})
})


server.listen(process.env.PORT);

