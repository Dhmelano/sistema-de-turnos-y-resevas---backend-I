import { Router } from "express";
import ServiceManager from "../managers/ServiceManager.js";

const serviceManager = new ServiceManager();
const router = Router();



router.get("/api/services", async (req, res) => {
    try {
        const { category, available } = req.query;
        const services = await serviceManager.getServices({ category, available });
        return res.status(200).json({ status: 'success', payload: services });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
});

router.get("/api/services/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const service = await serviceManager.getServiceById(id);
        return res.status(200).json({ status: 'success', payload: service });

    } catch (error) {
        return res.status(404).json({ status: 'error', message: error.message });
    }
});

router.post("/api/services", async (req, res) => {
    try {
        const newService = req.body;
        console.log(newService)
        const service = await serviceManager.addService(newService);
        return res.status(201).json({ status: 'succes', payload: service });
    } catch (error) {
         return res.status(400).json({ status: 'error', message: error.message });
    }
});
router.put("/api/services/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const service = await serviceManager.updateService(id, updatedData);
        return res.status(200).json({ status: 'success', payload: service });
    } catch (error) {
         return res.status(404).json({ status: 'error', message: error.message });
    }
});


router.delete("/api/services/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const serviceDelete = await serviceManager.deleteService(id);
        return res.status(200).json({ status: 'success', payload: serviceDelete });
    } catch (error) {
         return res.status(404).json({ status: 'error', message: error.message });
    }

});



export default router 