import { Router } from "express";
import orderSchema from "../models/order.js";

const route = Router();

route.get("/prod", async (req, res) => {
  try {
    const result = await orderSchema.find({
      user_id: "65e474546d2349e72493d006",
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
});

export default route;
