import { Router } from "express";
import {
  addNewMenu,
  deleteProduct,
  editMenu,
  getAllProducts,
  getPenjualan,
} from "../controllers/admin.js";

const route = Router();

route.get("/weekly", getPenjualan);
route.post("/addNewMenu", addNewMenu);
route.get("/getAllProducts", getAllProducts);
route.post("/deleteProduct", deleteProduct);
route.post("/editProduct", editMenu);

export default route;
