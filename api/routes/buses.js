import express from "express";
import {
  allStationsNames,
  confirmBooking,
  countByFirstStation,
  createBus,
  deleteBus,
  filterBuses,
  getAllBuses,
  getBusCollection,
  getBus,
  payment,
  updateBus,
  getBookingBySessionId,
  getAllBusesAdmin // Added the new function
} from "../controllers/bus.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create
router.post("/", verifyAdmin, createBus);

// Update bus
router.put("/:id", verifyAdmin, updateBus);

// Delete bus
router.delete("/:id", verifyAdmin, deleteBus);

// Get bus
router.get("/find/:id", getBus);

// Get all buses (public)
router.get("/", getAllBuses);

// Get all buses (admin)
router.get("/allBuses", verifyAdmin, getAllBusesAdmin);

// Get all bus collection
router.get("/all", getBusCollection);

// Get all stations for searching
router.get("/stationsList", allStationsNames);

// Get sorted buses
router.post("/filter", filterBuses);

router.get("/countByFirstStation", countByFirstStation);

router.post("/create-checkout-session", payment);

router.post("/confirmbooking", confirmBooking);

router.get("/booking/:session_id", getBookingBySessionId);

export default router;