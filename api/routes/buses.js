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
} from "../controllers/bus.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/", createBus); //removed verifyAdmin from this line

//update bus
router.put("/:id", verifyAdmin, updateBus);

//delete bus
router.delete("/:id", verifyAdmin, deleteBus);

//get bus
router.get("/find/:id", getBus);

//get all buses
router.get("/", getAllBuses);

//get all bus collection
router.get("/all", getBusCollection)

//get all stations for searching
router.get("/stationsList", allStationsNames)

//get sorted buses
router.post("/filter", filterBuses);

router.get("/countByFirstStation", countByFirstStation);

router.post("/create-checkout-session", payment)

router.post("/confirmbooking", confirmBooking)

export default router;
