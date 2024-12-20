import express from "express";
import {
  countByFirstStation,
  createBus,
  deleteBus,
  getAllBuses,
  getBus,
  updateBus,
} from "../controllers/bus.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/", verifyAdmin, createBus);

//update bus
router.put("/:id", verifyAdmin, updateBus);

//delete bus
router.delete("/:id", verifyAdmin, deleteBus);

//get bus
router.get("/find/:id", getBus);

//get all buses
router.get("/", getAllBuses);

router.get("/countByFirstStation", countByFirstStation);

export default router;
