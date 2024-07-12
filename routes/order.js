import { Router } from "express";
import { addOrder, getMenu } from "../controllers/order.js";
import { authenticateToken } from "../middlewares/jwt.js";
import { validateOrder } from "../middlewares/joi.js";

const route = Router();

route.post("/", authenticateToken, validateOrder, addOrder);
route.get("/getMenu/:menu", getMenu);

export default route;
