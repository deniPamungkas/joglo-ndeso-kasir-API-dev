import express from "express";
import mongoose, { mongo } from "mongoose";
import authRouter from "./routes/auth.js";
import orderRouter from "./routes/order.js";
import adminRouter from "./routes/admin.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log("server is running");
});

mongoose
  .connect(process.env.DATABASE_URL, { dbName: process.env.DBNAME })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("failed to connect database" + err);
  });
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth/v1", authRouter);
app.use("/order/v1", orderRouter);
app.use("/admin/v1", adminRouter);
