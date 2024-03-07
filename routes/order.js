import { Router } from "express";
import { addOrder } from "../controllers/order.js";

const route = Router();

route.post("/addOrder", addOrder);

export default route;
