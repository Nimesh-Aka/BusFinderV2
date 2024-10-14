import User from "../models/Bus.js";

//update a user
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

//delete a user
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    next(err);
  }
};

//get a user
export const getUser = async (req, res, next) => {
  console.log("Received request to get User with ID:", req.params.id); // Log to check if function is called
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User found:", user);
    res.status(200).json(user);
  } catch (err) {
    console.error("Error occurred:", err); // Log the error
    next(err);
  }
};

//get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const useres = await User.find();
    res.status(200).json(useres);
  } catch (err) {
    next(err);
  }
};
