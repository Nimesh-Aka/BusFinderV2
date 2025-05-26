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
  getTotalCostData,
  getAllBusesAdmin,
  getBookingUsers,
  getDailyRevenue,
  getAllBookings,
  getUserBookings
} from "../controllers/bus.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/", createBus); //removed verifyAdmin from this line

//update bus - only one update route needed
router.put("/:id", updateBus);

//delete bus - only one delete route needed
router.delete("/:id", deleteBus);

//get bus
router.get("/find/:id", getBus);

//get all buses
router.get("/", getAllBuses);

//get all bus collection
router.get("/all", getBusCollection);

//get all stations for searching
router.get("/stationsList", allStationsNames);

//get sorted buses
router.post("/filter", filterBuses);

//get bus count by first station
router.get("/countByFirstStation", countByFirstStation);


router.post("/create-checkout-session", payment);


router.post("/confirmbooking", confirmBooking);

router.get("/booking/:session_id", getBookingBySessionId);

// Add this route to your existing routes
router.get("/totalcost", getTotalCostData);

//Admin
router.get("/allBuses", getAllBusesAdmin);

// Get booking records with user details (sorted by recent payments)
router.get("/bookings/users", getBookingUsers);

// Get daily revenue reports
router.get("/reports/daily", getDailyRevenue);

router.get("/analytics", getAllBookings);

//
// Add this new route - place it BEFORE the session_id route to avoid route conflicts


// Add this to your routes file
router.get("/bookings/user/:userId", getUserBookings);



export default router;
