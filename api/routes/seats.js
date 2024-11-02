import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  addSeat,
  deleteSeat,
  getSeat,
  getAllSeats,
  updateSeat,
} from "../controllers/seats.js";

const router = express.Router();

//create a seat
router.post("/:busid", verifyAdmin, addSeat);

//update seat
router.put("/:id", verifyAdmin, updateSeat);

//delete seat
router.delete("/:id/:busid", verifyAdmin, deleteSeat);

//get a seat
router.get("/find/:id", getSeat);

//get all seats
router.get("/", getAllSeats);

export default router;
