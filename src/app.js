import express from 'express';
import servicesRouter from './routes/services.routers.js';
import bookingRouter from './routes/bookings.router.js';

const app = express();

app.use(express.json());

app.use((req,res,next)=>{
    console.log("method:",req.method,"url:",req.url);
    next();
});

app.use(servicesRouter);

app.use('/api/services', servicesRouter);
app.use('/api/bookings', bookingRouter);




app.use((error, req, res, next) => {
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({ status: 'error', message: 'El body no es un JSON válido' });
    }
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
});

export default app;