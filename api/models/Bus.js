import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busName: String,
  route: String, // general route name (optional)
  stations: [
    {
      stationName: String, // Name of the station (e.g., 'Colombo', 'Galle')
      arrivalTime: String, // Time the bus arrives at this station
    },
  ],
  availableSeats: Number,
  departureDate: Date,
  ticketPrice: Number,
});

export default mongoose.model("Bus", busSchema);
