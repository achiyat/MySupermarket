// src/config/db.ts
import mongoose from "mongoose";
import { MONGO_URI } from "../constants";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};
