import { Router } from "express";
import { addOrder, getMenu } from "../controllers/order.js";

const route = Router();

route.post("/addOrder", addOrder);
route.get("/getMenu/:menu", getMenu);

export default route;
