// routes/plant.routes.js
import express from "express";
import { getPlants, getPlantById } from "../controllers/getPlant.controller.js";

const router = express.Router();

router.get("/plants", getPlants); // ✅ GET all plants
router.get("/plants:id", getPlantById); // ✅ GET plant by id

export default router;
