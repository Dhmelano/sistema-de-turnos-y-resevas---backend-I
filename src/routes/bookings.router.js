import { Router } from "express";
import { fileURLToPath } from "url";
import path from "path";
import BookingManager from "../managers/BookingManager.js";


const router = Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bookingPath = path.resolve(__dirname, '../data/bookings.json');

const manager = new BookingManager(bookingPath);


const sendError = (res, error) => {
    const statusCode = error.statusCode || 500;
    console.error(`[Error ${statusCode}]: ${error.message}`);
    return res.status(statusCode).json({
        success: false,
        message: error.message || 'Error interno del servidor',
    });
};

router.get("/", async (req, res) => {

    try {
        const bookings = await manager.getBookings();
        res.status(200).json(bookings);
    } catch (err) {
        console.log(err);
        sendError(res, err);
    }
})

router.post("/", async (req, res) => {
    const body = req.body;
    try {
        await manager.createBooking(body);
        res.status(201).json({})
    } catch (err) {
        sendError(res, err);
    }
})

router.get("/:id", async (req, res) => {


    try {
        const { id } = req.params;
        const bookings = await manager.getBookingsById(id);
        return res.status(200).json({ status: 'success', payload: bookings });

    } catch (error) {
        console.log(error)

        sendError(res, error);
    }


});

router.post('/:bid/service/:sid', async (req, res) => {
    try {
        const { bid, sid } = req.params;
        const updatedBooking = await manager.addServiceToBooking(bid, sid);
        res.status(200).json({ status: 'success', payload: updatedBooking });
    } catch (error) {
       sendError(res, error);
    }
});





export default router