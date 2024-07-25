import express from "express";
import authRouter from "./routes/auth.js";
import orderRouter from "./routes/order.js";
import adminRouter from "./routes/admin.js";
import salesRouter from "./routes/sales.js";
import invoiceRouter from "./routes/invoice.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect } from "./config/db.js";

const app = express();
dotenv.config();
dbConnect();

app.listen(process.env.PORT, () => {
  console.log("server is running");
});

app.use(
  cors({
    origin: [
      "https://joglo-ndeso-kasir-admin-dev.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/orders", orderRouter);
app.use("/products", adminRouter);
app.use("/sales", salesRouter);
app.use("/invoice", invoiceRouter);
