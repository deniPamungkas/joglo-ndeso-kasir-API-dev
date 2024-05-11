import { Router } from "express";
import {
  addNewMenu,
  getAllProducts,
  getPenjualan,
} from "../controllers/admin.js";

const route = Router();

route.get("/weekly", getPenjualan);
route.post("/addNewMenu", addNewMenu);
route.get("/getAllProducts", getAllProducts);

export default route;
