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

    // Check if busDepartureDate is provided in 'YYYY-MM-DD' format and convert it to a date range
    if (req.query.busDepartureDate) {
      const busDepartureDate = req.query.busDepartureDate;
      const startOfDay = new Date(busDepartureDate);
      const endOfDay = new Date(busDepartureDate);
      endOfDay.setDate(endOfDay.getDate() + 1);  // Move to the next day to create a range

      query.busDepartureDate = {
        $gte: startOfDay,
        $lt: endOfDay,
      };
    }

    // Check if busCitiesAndTimes.cityName is provided
    if (req.query.fromCity && req.query.toCity) {
      query['busCitiesAndTimes'] = {
        $all: [
          { $elemMatch: { cityName: req.query.fromCity } },
          { $elemMatch: { cityName: req.query.toCity } }
        ]
      };
    }

    const buses = await Bus.find(query).limit(limit);

    // Filter buses to ensure 'fromCity' comes before 'toCity'
    const filteredBuses = buses.filter(bus => {
      const fromIndex = bus.busCitiesAndTimes.findIndex(city => city.cityName === req.query.fromCity);
      const toIndex = bus.busCitiesAndTimes.findIndex(city => city.cityName === req.query.toCity);
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
