import Seats from "../models/Seats.js";
import Bus from "../models/Bus.js";
import { createError } from "../utils/error.js";

//adding a seat
export const addSeat = async (req, res, next) => {
  try {
    const busId = req.params.busid;
    const newSeat = new Seats(req.body);

    try {
      const savedSeat = await newSeat.save(); // Save the new seat
      try {
        await Bus.findByIdAndUpdate(busId, { $push: { seats: savedSeat._id } });
      } catch (err) {
        next(err);
      }
      res.status(200).json(savedSeat);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

//update a Seat
export const updateSeat = async (req, res, next) => {
  try {
    const updatedSeat = await Seats.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedSeat);
  } catch (err) {
    next(err);
  }
};

//delete a seat
export const deleteSeat = async (req, res, next) => {
  const busId = req.params.busid;
  try {
    await Seats.findByIdAndDelete(req.params.id);
    try {
      await Bus.findByIdAndUpdate(busId, { $pull: { seats: req.params.id } });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Seat has been deleted...");
  } catch (err) {
    next(err);
  }
};

//get a room
export const getSeat = async (req, res, next) => {
  console.log("Received request to get bus with ID:", req.params.id); // Log to check if function is called
  try {
    const seat = await Seats.findById(req.params.id); 
    if (!seat) {
      console.log("Bus not found");
      return res.status(404).json({ message: "Bus not found" });
    }
    console.log("Bus found:", seat);
    res.status(200).json(seat);
  } catch (err) {
    console.error("Error occurred:", err); // Log the error
    next(err);
  }
};

//get all seats
export const getAllSeats = async (req, res, next) => {
  try {
    const seats = await Seats.find();
    res.status(200).json(seats);
  } catch (err) {
    next(err);
  }
};
