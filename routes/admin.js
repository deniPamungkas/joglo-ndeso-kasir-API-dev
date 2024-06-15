import { Router } from "express";
import {
  addNewMenu,
  deleteAll,
  deleteProduct,
  editMenu,
  getAllOrders,
  getAllProducts,
  getPenjualan,
  updateMenu,
} from "../controllers/admin.js";

const route = Router();

route.get("/weekly", getPenjualan);
route.post("/addNewMenu", addNewMenu);
route.get("/getAllProducts", getAllProducts);
route.post("/deleteProduct", deleteProduct);
route.post("/editProduct", editMenu);
route.patch("/updateProduct/:id", updateMenu);
route.get("/getAllOrders", getAllOrders);
route.get("/deleteAll", deleteAll);

export default route;
