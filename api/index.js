import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.js";
import busRouter from "./routes/buses.js";
import userRouter from "./routes/users.js";
import seatsRouter from "./routes/seats.js";
import cookieParser from "cookie-parser";


//tem comment
const app = express(); //this line create a new web server

dotenv.config();
//Allowing Other Websites to Talk to Your Server

const PORT = process.env.PORT || 8000;


//db connection
const connect = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB");
    throw err;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/buses", busRouter);
app.use("/api/users", userRouter);
app.use("/api/seats", seatsRouter);

//error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  connect();
  console.log("Listen to port", PORT);
});
