import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const mongoURI = process.env.MONGO_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectToDB;
