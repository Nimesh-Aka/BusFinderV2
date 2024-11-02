import mongoose from "mongoose";
const SeatSchema = new mongoose.Schema({
  seatNumber: [{ number: Number, unavailableDates: { type: [Date] } }],
});

export default mongoose.model("Seat", SeatSchema);
