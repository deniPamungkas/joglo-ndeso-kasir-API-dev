import { Router } from "express";
import {
  addNewMenu,
  deleteProduct,
  getAllProducts,
  getPenjualan,
} from "../controllers/admin.js";

const route = Router();

route.get("/weekly", getPenjualan);
route.post("/addNewMenu", addNewMenu);
route.get("/getAllProducts", getAllProducts);
route.post("/deleteProduct", deleteProduct);

export default route;
