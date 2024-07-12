import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DBNAME,
    });
    return console.log("connected to database");
  } catch (error) {
    return console.log("failed to connect database" + error);
  }
};
