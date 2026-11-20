import fs from "fs/promises";
import ServiceManager from "./ServiceManager.js";


const serviceManager = new ServiceManager()

export default class BookingManager {
    constructor(filePath) {
        this.path = filePath;
    }

    handleError(error, statusCode = 500) {
        const message = error instanceof Error ? error.message : String(error);
        const newError = new Error(message);
        newError.statusCode = statusCode;
        if (error instanceof Error && error.stack) {
            newError.stack = error.stack;
        }
        return newError;
    }


    async getBookings() {
        try {
            console.log(this.path)
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fs.writeFile(this.path, JSON.stringify([], null, 2), 'utf-8');
                return [];
            }
            throw this.handleError(`Error al leer los booking: ${error.message}`, 500);
        }
    }

    async getBookingsById(id) {
        const bookings = await this.getBookings();
        const booking = bookings.find((s) => String(s.id) === String(id));
        if (!booking) {
            throw createError(`servicio con ID ${id} no encontrado `, 404)
        }
        return booking;
    }

    async createBooking(booking) {
        const { clientName, clientEmail, date, time, status, services } = booking;

        if (!clientName || !clientEmail || !date || !time || !status || !services) {
            throw this.handleError(`Todos los campos son requeridos`, 400)
        }

        try {
            const bookings = await this.getBookings();
            const newId = bookings.length === 0 ? 1 : Math.max(...bookings.map(b => Number(b.id))) + 1;
            const newBooking = {
                id: String(newId),
                clientName,
                clientEmail,
                date,
                time,
                status,
                services
            };
            console.log(newBooking);
            bookings.push(newBooking);
            await fs.writeFile(this.path, JSON.stringify(bookings, null, 2), 'utf-8');
        } catch (error) {
            throw this.handleError(`Error al leer los booking: ${error.message}`, 500);
        }
    }

    async addServiceToBooking(bookingId, serviceId) {
        try {
            try {
                await serviceManager.getServiceById(serviceId);
            } catch (err) {
                throw this.handleError(`Servicio con ID ${serviceId} no encontrado`, 404);
            }

            const bookings = await this.getBookings();
            const bookingIndex = bookings.findIndex((b) => String(b.id) === String(bookingId));

            if (bookingIndex === -1) {
                throw this.handleError(`Reserva con ID ${bookingId} no encontrada`, 404);
            }

            const booking = bookings[bookingIndex];

            if (!Array.isArray(booking.services)) {
                booking.services = [];
            }

            const hasValidId = booking.services.some(
                (item) => item.service && !isNaN(Number(item.service))
            );

            if (!hasValidId) {

                booking.services = [{
                    service: String(serviceId),
                    quantity: 1
                }];
            } else {

                const existingServiceIndex = booking.services.findIndex(
                    (item) => String(item.service) === String(serviceId)
                );

                if (existingServiceIndex !== -1) {
                    booking.services[existingServiceIndex].quantity += 1;
                } else {
                    booking.services.push({
                        service: String(serviceId),
                        quantity: 1
                    });
                }
            }

            await fs.writeFile(this.path, JSON.stringify(bookings, null, 2), 'utf-8');
            return booking;

        } catch (error) {
            throw this.handleError(error.message, error.statusCode || 500);
        }
    }

}