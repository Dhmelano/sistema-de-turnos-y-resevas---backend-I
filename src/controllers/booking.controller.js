import BookingManager from "../managers/BookingManager.js";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bookingPath = path.resolve(__dirname, '../data/bookings.json');



const sendError = (res, error) => {
    const statusCode = error.statusCode || 500;
    console.error(`[Error ${statusCode}]: ${error.message}`);
    return res.status(statusCode).json({
        success: false,
        message: error.message || 'Error interno del servidor',
    });
};

class BookingController {

    constructor() {
        this.bookingManager = new BookingManager(bookingPath);
    }

    async getAll(req, res) {
        try {
            const bookings = await this.bookingManager.getBookings();
            res.status(200).json(bookings);
        } catch (err) {
            console.log(err);
            sendError(res, err);
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const bookings = await this.bookingManager.getBookingsById(id);
            return res.status(200).json({ status: 'success', payload: bookings });

        } catch (error) {
            console.log(error)

            sendError(res, error);
        }
    }

    async createBooking(req, res) {
        const body = req.body;
        try {
            await this.bookingManager.createBooking(body);
            res.status(201).json({})
        } catch (err) {
            sendError(res, err);
        }
    }

    async postServiceToBooking(req,res) {
        try {
            const { bid, sid } = req.params;
            const updatedBooking = await this.bookingManager.addServiceToBooking(bid, sid);
            res.status(200).json({ status: 'success', payload: updatedBooking });
        } catch (error) {
            sendError(res, error);
        }
    }



}

export default BookingController;