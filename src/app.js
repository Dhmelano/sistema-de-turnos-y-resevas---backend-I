/*
import packageJson from '../package.json' with { type: 'json' };

export const { name, version, description, author, license } = packageJson;

export default packageJson;
*/
// arriba estoy configurado la apliacion pero mas adelante no esta esto asi que por ahora lo saco.

import express from 'express';
import servicesRouter from './routes/services.routers.js';

const app = express();

app.use(express.json()); 

app.use(servicesRouter);


app.use((req,res,next)=>{
    console.log("method:",req.method,"url:",req.url);
    next();
});

app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({ status: 'error', message: 'El body no es un JSON válido' });
    }
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
});

export default app;