import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

//User Registration
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      mobile: req.body.mobile,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been registered");
  } catch (error) {
    next(error);
  }
};

//User Login
export const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(401).json({
        message: "Invalid username.", // Username does not exist
      });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect password.", // Password is incorrect
      });
    }

    // Generate a token (JWT for example)
    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Respond with user info and token
    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
}


//Check for uniqueness of username, email and mobile
export const checkUniqueness = async (req, res, next) => {
  try {
    const { userName, email, mobile } = req.body;

    const errors = {};

    console.log("Received data:", req.body);

    const userNameExists = await User.findOne({ userName });
    if (userNameExists) {
      errors.userName = "Username already exists";
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      errors.email = "Email already exists";
    }

    const mobileExists = await User.findOne({ mobile });
    if (mobileExists) {
      errors.mobile = "Mobile number already exists";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(409).json({ errors });
    }

    res.status(200).json({ userName: true, email: true, mobile: true });
  } catch (error) {
    next(error);
  }
};

//get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};