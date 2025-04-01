import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming users book tickets
    required: true,
  },
  selectedSeats: {
    type: [String],
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  routeTo: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Booking", bookingSchema);
