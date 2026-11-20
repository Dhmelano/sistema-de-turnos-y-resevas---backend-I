import { Router } from "express";
import ServiceManager from "../managers/ServiceManager.js";
import ServiceController from "../controllers/service.controller.js";

const serviceManager = new ServiceManager();

const serviceController = new ServiceController(); 

const router = Router();


router.get("/", (req, res)=> serviceController.getAll(req, res) );

router.get("/:id", (req,res) => serviceController.getById(req, res) );

router.post("/" , (req,res)=> serviceController.createService(req,res));

router.put("/:id", (req,res)=> serviceController.putUpDate(req,res));

router.delete("/:id", (req,res )=> serviceController.deletService (req,res) );

export default router 