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

// Define a sub-schema for bus stops and times
const stopTimeSchema = new mongoose.Schema({
  stopName: {
    type: String,
    required: true,
    trim: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
});

const busSchema = new mongoose.Schema({
  busName: {
    type: String,
    required: true,
    trim: true,
  },
  busType: {
    type: String,
    required: true,
    enum: ["Standard", "Luxury", "Sleeper", "Seater"], // Example types
    trim: true,
  },
  busRouteNumber: {
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
  busFeatures: {
    type: [String], // Array of features (e.g., "WiFi", "AC", "Charging Points")
    default: [], // Defaults to an empty array if no features are added
  },
  busStopsAndTimes: {
    type: [stopTimeSchema], // Array of stops with arrival and departure times
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  seats: {
    type: [String], // Array of seat numbers
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Custom validator to limit the number of cities in busCitiesAndTimes
function arrayLimit(val) {
  return val.length <= 30;
}

export default mongoose.model("Bus", busSchema);
