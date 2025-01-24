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
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or username"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    console.log(token);
    res
      .cookie("access_token", token, {
        httOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};


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