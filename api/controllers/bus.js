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
    const buses = await Bus.find();
    res.status(200).json(buses);
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
