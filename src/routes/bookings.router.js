import { Router } from "express";
import { fileURLToPath } from "url";
import path from "path";
import BookingManager from "../managers/BookingManager.js";
import BookingController from "../controllers/booking.controller.js";



const router = Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bookingPath = path.resolve(__dirname, '../data/bookings.json');

const manager = new BookingManager(bookingPath); 
const bookingController = new BookingController ();

const sendError = (res, error) => {
    const statusCode = error.statusCode || 500;
    console.error(`[Error ${statusCode}]: ${error.message}`);
    return res.status(statusCode).json({
        success: false,
        message: error.message || 'Error interno del servidor',
    });
};

router.get("/", (req, res)=> bookingController.getAll(req, res) );

router.get("/:id" , (req,res)=> bookingController.getById(req,res));

router.post("/", (req,res)=> bookingController.createBooking(req,res));

router.post("/:bid/service/:sid", (req,res)=> bookingController.postServiceToBooking(req,res));


export default router