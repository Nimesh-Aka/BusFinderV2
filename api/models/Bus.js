import mongoose from "mongoose";

// Define a sub-schema for cities and times
const cityTimeSchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
    trim: true,
  },
  arrivalTime: {
    type: String,
    required: true, // Format could be "HH:MM"
  },
});

const busSchema = new mongoose.Schema({
  busName: {
    type: String,
    required: true,
    trim: true,
  },
  busPlateNo: {
    type: String,
    required: true,
    trim: true,
  },
  busCitiesAndTimes: {
    type: [cityTimeSchema], // Array of cities and arrival times
    validate: [arrayLimit, "{PATH} exceeds the limit of 30"], // Limit to 30 cities
  },
  busTicketPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  busDepartureDate: {
    type: Date,
    required: true,
  },
  availableSeats: {
    type: [String], // Array of seat numbers
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Custom validator to limit the number of cities in busCitiesAndTimes
function arrayLimit(val) {
  return val.length <= 50;
}

export default mongoose.model("Bus", busSchema);
