import Bus from "../models/Bus.js";

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
export const getAllBuses = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 0; // Default to 0 if limit is not provided or invalid
    const query = {};

    // Get the current date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set to start of the day

    // Check if busDepartureDate is provided in 'YYYY-MM-DD' format
    if (req.query.busDepartureDate) {
      const busDepartureDate = new Date(req.query.busDepartureDate);
      busDepartureDate.setHours(0, 0, 0, 0); // Set to start of the day

      query.busDepartureDate = busDepartureDate;
    } else {
      // If busDepartureDate is not provided, filter for today and future buses
      query.busDepartureDate = { $gte: currentDate };
    }

    // Check if busCitiesAndTimes.cityName is provided
    if (req.query.fromCity && req.query.toCity) {
      query["busCitiesAndTimes"] = {
        $all: [
          { $elemMatch: { cityName: req.query.fromCity } },
          { $elemMatch: { cityName: req.query.toCity } },
        ],
      };
    }

    const buses = await Bus.find(query)
      .sort({ busDepartureDate: 1 })
      .limit(limit);

    // Filter buses to ensure 'fromCity' comes before 'toCity'
    const filteredBuses = buses.filter((bus) => {
      const fromIndex = bus.busCitiesAndTimes.findIndex(
        (city) => city.cityName === req.query.fromCity
      );
      const toIndex = bus.busCitiesAndTimes.findIndex(
        (city) => city.cityName === req.query.toCity
      );
      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });

    res.status(200).json(filteredBuses);
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

    // Date Filter
    if (busDepartureDate) {
      const targetDate = new Date(busDepartureDate).toISOString().split("T")[0];
      filteredBuses = filteredBuses.filter((bus) => {
        const busDate = new Date(bus.busDepartureDate)
          .toISOString()
          .split("T")[0];
        return busDate === targetDate;
      });
    }

    // Route Filter
    if (fromCity && toCity) {
      filteredBuses = filteredBuses.filter((bus) => {
        const fromIndex = bus.busCitiesAndTimes.findIndex(
          (c) => c.cityName === fromCity
        );
        const toIndex = bus.busCitiesAndTimes.findIndex(
          (c) => c.cityName === toCity
        );
        return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
      });
    }

    // Sorting
    switch (sortBy) {
      case "priceAsc":
        filteredBuses.sort((a, b) => a.busTicketPrice - b.busTicketPrice);
        break;
      case "priceDesc":
        filteredBuses.sort((a, b) => b.busTicketPrice - a.busTicketPrice);
        break;
    }

    // **Return -1 if no matching buses found**
    if (filteredBuses.length === 0) {
      return res.status(200).json(-1);
    }
    
    res.status(200).json(filteredBuses);
  } catch (err) {
    console.error('Error filtering buses:', err);
    next(err);
  }
};