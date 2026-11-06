import http from 'http';
import express from "express";
import { config } from './config/env.config.js';
import ServiceManager from './managers/ServiceManager.js';
import servicesRouter from "./routes/services.routers.js";

const port = config.PORT;
const serviceManager = new ServiceManager();  
const app = express();

app.listen(port, () => {
    console.log(`Server started on port ${port}, Bienvenidos a ${config.APP_NAME}`);
});

app.use(express.json()); // configura express a formato json 

app.use((req,res,next)=>{
    console.log("method:",req.method,"url:",req.url);
    next();
});

app.use(servicesRouter);

/*
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});

    const response = {
        message: 'Bienvenido al backend del sistema de turnos y reservas ',
        status: 200,
    }
    res.end(JSON.stringify(response));
})

server.listen(port, () => {
    console.log(`Server started on port ${port}, Bienvenidos a ${config.APP_NAME}`);
})
*/