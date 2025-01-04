import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.js";
import busRouter from "./routes/buses.js";
import userRouter from "./routes/users.js";
import cookieParser from "cookie-parser";

//temp comment
const app = express();
dotenv.config();
app.use(cors());

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
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/buses", busRouter);
app.use("/api/users", userRouter);

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
