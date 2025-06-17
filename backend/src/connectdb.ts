import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Error connecting to DB: ", err);
  }
};
export default connectDB;
