import Bus from "../models/Bus.js";
import Stripe from 'stripe';
import Booking from "../models/Booking.js";
import mongoose from "mongoose";

//create a bus
export const createBus = async (req, res, next) => {
  const newBus = new Bus(req.body);
  try {
    const savedBus = await newBus.save();
    res.status(200).json(savedBus);
  } catch (err) {
    next(err);
  }
};

//update a bus
export const updateBus = async (req, res, next) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBus);
  } catch (err) {
    next(err);
  }
};

//delete a bus
export const deleteBus = async (req, res, next) => {
  try {
    await Bus.findByIdAndDelete(req.params.id);
    res.status(200).json("Bus has been deleted...");
  } catch (err) {
    next(err);
  }
};

//get a bus
export const getBus = async (req, res, next) => {
  console.log("Received request to get bus with ID:", req.params.id); // Log to check if function is called
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      console.log("Bus not found");
      return res.status(404).json({ message: "Bus not found" });
    }
    console.log("Bus found:", bus);
    res.status(200).json(bus);
  } catch (err) {
    console.error("Error occurred:", err); // Log the error
    next(err);
  }
};

//get all buses
/*export const getAllBuses = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 0; // Default to 0 if limit is not provided or invalid
    const query = {};

    // Check if busDepartureDate is provided
    if (req.query.busDepartureDate) {
      const busDepartureDate = new Date(req.query.busDepartureDate);
      busDepartureDate.setHours(0, 0, 0, 0); // Set to start of the day
      query.busDepartureDate = { $gte: busDepartureDate }; // Get the given date and upcoming ones
    }

    // Check if fromCity and toCity are provided
    if (req.query.fromCity && req.query.toCity) {
      query["busCitiesAndTimes"] = {
        $all: [
          { $elemMatch: { cityName: req.query.fromCity } },
          { $elemMatch: { cityName: req.query.toCity } },
        ],
      };
    }

    // Fetch buses based on the query
    const buses = await Bus.find(query)
      .sort({ busDepartureDate: 1 }) // Sort by date ascending
      .limit(limit);

    // Filter buses to ensure 'fromCity' comes before 'toCity'
    const filteredBuses = buses.filter((bus) => {
      if (!Array.isArray(bus.busCitiesAndTimes)) return false; // Ensure busCitiesAndTimes is an array
      const fromIndex = bus.busCitiesAndTimes.findIndex(
        (city) => city.cityName === req.query.fromCity
      );
      const toIndex = bus.busCitiesAndTimes.findIndex(
        (city) => city.cityName === req.query.toCity
      );
      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });

    // Return the filtered buses
    res.status(200).json(filteredBuses);
  } catch (err) {
    console.error("Error fetching buses:", err);
    next(err);
  }
};*/

// Helper function to safely escape regex special characters
const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

//get all buses
export const getAllBuses = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 0;
    const query = {};

    // Handle date filtering
    if (req.query.busDepartureDate) {
      const busDepartureDate = new Date(req.query.busDepartureDate);
      busDepartureDate.setHours(0, 0, 0, 0);
      query.busDepartureDate = { $gte: busDepartureDate };
    }

    // Handle case-insensitive city matching with regex escaping
    if (req.query.fromCity && req.query.toCity) {
      const escapedFrom = escapeRegex(req.query.fromCity);
      const escapedTo = escapeRegex(req.query.toCity);

      query.busCitiesAndTimes = {
        $all: [
          { 
            $elemMatch: { 
              cityName: { 
                $regex: new RegExp(`^${escapedFrom}$`, 'i') 
              } 
            }
          },
          { 
            $elemMatch: { 
              cityName: { 
                $regex: new RegExp(`^${escapedTo}$`, 'i') 
              } 
            }
          }
        ]
      };
    }

    // Fetch buses from database
    const buses = await Bus.find(query)
      .sort({ busDepartureDate: 1 })
      .limit(limit);

    // Case-insensitive post-filtering for city order validation
    const filteredBuses = buses.filter(bus => {
      if (!Array.isArray(bus.busCitiesAndTimes)) return false;

      // Normalize city names for comparison
      const fromCityLower = req.query.fromCity?.toLowerCase();
      const toCityLower = req.query.toCity?.toLowerCase();

      // Find indices case-insensitively
      let fromIndex = -1;
      let toIndex = -1;

      bus.busCitiesAndTimes.forEach((city, index) => {
        const cityLower = city.cityName?.toLowerCase();
        if (cityLower === fromCityLower) fromIndex = index;
        if (cityLower === toCityLower) toIndex = index;
      });

      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });

    res.status(200).json(filteredBuses);
  } catch (err) {
    console.error("Error fetching buses:", err);
    next(err);
  }
};

//get all bus collection
export const getBusCollection = async (req, res, next) => {
  try {
    const buses = await Bus.find(); // Fetch all buses from the database
    res.status(200).json(buses); // Return all buses
  } catch (err) {
    next(err);
  }
};


//Extra
export const countByFirstStation = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) =>
        Bus.countDocuments({ "busCitiesAndTimes.0.cityName": city })
      )
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

//get all station names
export const allStationsNames = async (req, res, next) => {
  try {
    const searchQuery = req.query.search?.toLowerCase() || ""; // Get the search query from the request
    const allStations = await Bus.distinct("busCitiesAndTimes.cityName"); // Fetch all distinct city names

    // Filter stations based on the search query
    const filteredStations = allStations.filter((city) =>
      city.toLowerCase().includes(searchQuery)
    );

    res.status(200).json(filteredStations); // Return the filtered list
  } catch (err) {
    next(err);
  }
};

export const filterBuses = async (req, res, next) => {
  try {
    const {
      sortBy,
      busType,
      busOwnership,
      busAmenities,
      fromCity,
      toCity,
      busDepartureDate,
    } = req.body;

    // Fetch all buses from database instead of receiving in request body
    let buses = await Bus.find().populate(); // Assuming you have a Bus model

    let filteredBuses = buses;

    // Bus Type Filter
    if (busType?.length > 0) {
      filteredBuses = filteredBuses.filter((bus) =>
        busType.includes(bus.busType)
      );
    }

    // Company Filter
    if (busOwnership?.length > 0) {
      filteredBuses = filteredBuses.filter((bus) =>
        busOwnership.includes(bus.busOwnership)
      );
    }

    // Amenities Filter (AND condition - must include all selected amenities)
    if (busAmenities?.length > 0) {
      filteredBuses = filteredBuses.filter((bus) =>
        busAmenities.every((amenity) => bus.busAmenities.includes(amenity))
      );
    }

    // Date Filter - Modified to include the specified date and future dates
    if (busDepartureDate) {
      const targetDate = new Date(busDepartureDate);
      targetDate.setHours(0, 0, 0, 0); // Set to start of day

      filteredBuses = filteredBuses.filter((bus) => {
        const busDate = new Date(bus.busDepartureDate);
        busDate.setHours(0, 0, 0, 0); // Set to start of day
        return busDate >= targetDate; // Include this date and future dates
      });
    }

    // Route Filter - Made case-insensitive
    if (fromCity && toCity) {
      filteredBuses = filteredBuses.filter((bus) => {
        const fromIndex = bus.busCitiesAndTimes.findIndex(
          (c) => c.cityName.toLowerCase() === fromCity.toLowerCase()
        );
        const toIndex = bus.busCitiesAndTimes.findIndex(
          (c) => c.cityName.toLowerCase() === toCity.toLowerCase()
        );
        return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
      });
    }

    // Add number of days from search date as a property for sorting
    if (busDepartureDate) {
      const searchDate = new Date(busDepartureDate);
      searchDate.setHours(0, 0, 0, 0);
      
      filteredBuses = filteredBuses.map(bus => {
        const busDate = new Date(bus.busDepartureDate);
        busDate.setHours(0, 0, 0, 0);
        const daysDifference = Math.floor((busDate - searchDate) / (1000 * 60 * 60 * 24));
        return {...bus.toObject(), daysDifference};
      });
    }

    // Sorting - Modified to prioritize date, then price
    switch (sortBy) {
      case "priceAsc":
        // First sort by date (closest first), then by price (cheapest first)
        filteredBuses.sort((a, b) => {
          // If dates are different, sort by date
          if (a.daysDifference !== b.daysDifference) {
            return a.daysDifference - b.daysDifference;
          }
          // If dates are the same, sort by price
          return a.busTicketPrice - b.busTicketPrice;
        });
        break;
      case "priceDesc":
        // First sort by date (closest first), then by price (most expensive first)
        filteredBuses.sort((a, b) => {
          // If dates are different, sort by date
          if (a.daysDifference !== b.daysDifference) {
            return a.daysDifference - b.daysDifference;
          }
          // If dates are the same, sort by price
          return b.busTicketPrice - a.busTicketPrice;
        });
        break;
      default:
        // Default: sort by date (closest first), then by price (cheapest first)
        filteredBuses.sort((a, b) => {
          // If busDepartureDate is provided, sort by daysDifference
          if (busDepartureDate) {
            if (a.daysDifference !== b.daysDifference) {
              return a.daysDifference - b.daysDifference;
            }
          } else {
            // If no busDepartureDate provided, sort by actual date
            const dateA = new Date(a.busDepartureDate);
            const dateB = new Date(b.busDepartureDate);
            if (dateA.getTime() !== dateB.getTime()) {
              return dateA - dateB;
            }
          }
          // Then sort by price
          return a.busTicketPrice - b.busTicketPrice;
        });
    }

    // Log results for debugging
    console.log(`Found ${filteredBuses.length} buses matching the criteria`);

    // Return -1 if no matching buses found
    if (filteredBuses.length === 0) {
      return res.status(200).json(-1);
    }
    
    // Remove the temporary daysDifference property before sending response
    filteredBuses = filteredBuses.map(bus => {
      const { daysDifference, ...busWithoutDaysDifference } = bus;
      return busWithoutDaysDifference;
    });
    
    res.status(200).json(filteredBuses);
  } catch (err) {
    console.error('Error filtering buses:', err);
    next(err);
  }
};


// Payment Function
export const payment = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET);
    const { userId, totalCost, routeTo, busPlateNo, busName, busId, selectedSeats } = req.body;

    // Convert busId to ObjectId
    const busObjectId = new mongoose.Types.ObjectId(busId);

    // Convert totalCost to cents
    const amountInCents = Math.round(Number(totalCost) * 100);

    // Log debug info
    console.log("Selected Seats:", selectedSeats);
    console.log("Bus ID:", busId);

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'lkr',
          product_data: {
            name: `Bus Name - ${busName} (${busPlateNo})`,
            description: `Route To - ${routeTo}`,
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `http://localhost:3000/bus-tickets/payment`,
      cancel_url: `http://localhost:3000/bus-tickets/checkout`,
    });

    // Save booking details in DB
    const newBooking = new Booking({
      userId,
      busId: busObjectId,
      selectedSeats,
      totalCost,
      routeTo,
      paymentStatus: "pending",
    });

    await newBooking.save();
    console.log("Booking saved:", newBooking);

    // Check if bus exists
    const bus = await Bus.findById(busObjectId);
    if (!bus) {
      console.error("Bus not found.");
      return res.status(404).json({ error: "Bus not found" });
    }
    console.log("Bus Found:", bus);

    // Update seat availability
    const updateResult = await Bus.updateMany(
      { _id: busObjectId, "seats.seatNumber": { $in: selectedSeats } },
      { $set: { "seats.$.availability": "booked" } }
    );

    console.log("Seats update result:", updateResult);

    res.status(200).json(session);
  } catch (err) {
    console.error("Error in payment function:", err);
    next(err);
  }
};

// Confirm Booking Function
export const confirmBooking = async (req, res, next) => {
  try {
    const { busId, selectedSeats, sessionId } = req.body;

    if (!busId || !selectedSeats || selectedSeats.length === 0 || !sessionId) {
      return res.status(400).json({ error: "Invalid request. Missing data." });
    }

    console.log("Received Booking Request for Bus:", busId);
    console.log("Seats to Update:", selectedSeats);

    // Find the bus
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ error: "Bus not found." });
    }

    // Update seat availability
    let updated = false;
    bus.seats = bus.seats.map(seat => {
      if (selectedSeats.includes(seat.seatNumber) && seat.availability === "available") {
        seat.availability = "booked";
        updated = true;
      }
      return seat;
    });

    if (!updated) {
      return res.status(400).json({ error: "Seats not updated. Check seat numbers and availability." });
    }

    // Save the updated bus
    await bus.save();
    res.json({ message: "Seats successfully booked!", bookedSeats: selectedSeats });
  } catch (error) {
    console.error("Error confirming booking:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
