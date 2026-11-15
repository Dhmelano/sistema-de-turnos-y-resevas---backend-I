//import express from "express";  probando
import { config } from './config/env.config.js'; 
//import ServiceManager from './managers/ServiceManager.js';  // lo saque tambien
//import servicesRouter from "./routes/services.routers.js"; probando
import app from './app.js';

const port = config.PORT;

app.listen(port, () => {
    console.log(`Server started on port ${port}, Bienvenidos a ${config.APP_NAME}`);
});


/*
//const serviceManager = new ServiceManager();   // lo saque por que no lo utilize
const app = express();
app.use(servicesRouter);

app.use(express.json()); 

app.use((req,res,next)=>{
    console.log("method:",req.method,"url:",req.url);
    next();
});

probando

*/



/*
app.use((req,res,next)=>{
    console.log("method:",req.method,"url:",req.url);
    next();
});

probando
*/

/*
app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({ status: 'error', message: 'El body no es un JSON válido' });
    }
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
});

probando
*/
