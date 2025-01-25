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

// Define a sub-schema for seat availability
const seatSchema = new mongoose.Schema({
  seatNumber: {
    type: String,
    required: true,
    trim: true, // Example: "A1", "B3", etc.
  },
  availability: {
    type: String,
    enum: ['available', 'booked', 'maintenance'], // Define possible statuses
    default: 'available', // Default to 'available'
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
  busType: {
    type: String,
    enum: ['AC Delux', 'Tourist AC Delux', 'Air Suspension', 'Luxury AC Delux'], // Bus types
    
  },
  busOwnership: {
    type: String,
    enum: ['CTB', 'Private'], // Ownership type
  },
  busAmenities: {
    type: [String], // Array of amenities
    enum: [
      'Internet/Wifi',
      'AC',
      'Water Bottles',
      'Led TV',
      'Music',
      'Charging Ports',
      'Fan',
      'Super AC',
      'Vip Sofa',
    ],
    default: [], // Default to an empty array
  },
  recommends: {
    type: Number, // Number of recommendations
  },
  busCitiesAndTimes: {
    type: [cityTimeSchema], // Array of cities and arrival times
    validate: [arrayLimit, "{PATH} exceeds the limit of 50"], // Limit to 50 cities
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
  seats: {
    type: [seatSchema], // Array of seat objects
    validate: [arrayLimit, "{PATH} exceeds the limit of 50"], // Optional: Limit the number of seats
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Custom validator to limit array length
function arrayLimit(val) {
  return val.length <= 50; // Adjust the limit as needed
}

export default mongoose.model("Bus", busSchema);
