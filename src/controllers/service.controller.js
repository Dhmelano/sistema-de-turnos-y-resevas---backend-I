import ServiceManager from "../managers/ServiceManager.js";



class ServiceController {
    
    constructor() {
        this.serviceManager = new ServiceManager();
    }

    async getAll(req, res) {
        try {
            const { category, available } = req.query;
            const services = await this.serviceManager.getServices({ category, available });
            return res.status(200).json({ status: 'success', payload: services });
        } catch (error) {
            return res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const service = await this.serviceManager.getServiceById(id);
            return res.status(200).json({ status: 'success', payload: service });

        } catch (error) {
            return res.status(404).json({ status: 'error', message: error.message });
        }
    }

    async createService(req, res) {
        try {
            const newService = req.body;
            console.log(newService)
            const service = await this.serviceManager.addService(newService);
            return res.status(201).json({ status: 'succes', payload: service });
        } catch (error) {
            return res.status(400).json({ status: 'error', message: error.message });
        }

    }

    async putUpDate(req, res) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const service = await this.serviceManager.updateService(id, updatedData);
            return res.status(200).json({ status: 'success', payload: service });
        } catch (error) {
            return res.status(404).json({ status: 'error', message: error.message });
        }
    }

    async deletService(req, res) {
        try {
            const { id } = req.params;
            console.log(id)
            const serviceDelete = await this.serviceManager.deleteService(id);
            return res.status(200).json({ status: 'success', payload: serviceDelete });
        } catch (error) {
            return res.status(404).json({ status: 'error', message: error.message });
        }
    }

}

export default ServiceController;
