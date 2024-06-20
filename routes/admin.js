import { Router } from "express";
import {
  addNewMenu,
  deleteAll,
  deleteProduct,
  editMenu,
  getAllOrders,
  getAllProducts,
  getOrdersByDate,
  getPenjualan,
  getSixMonthOrders,
  getSixMonthOrdersSum,
  getThisDayOrders,
  getThisMonthOrders,
  getThisWeekOrders,
  updateMenu,
} from "../controllers/admin.js";

const route = Router();

route.get("/weekly", getPenjualan);
route.post("/addNewMenu", addNewMenu);
route.get("/getAllProducts", getAllProducts);
route.post("/deleteProduct", deleteProduct);
route.post("/editProduct", editMenu);
route.patch("/updateProduct/:id", updateMenu);
route.get("/getSixMonthOrders", getSixMonthOrders);
route.get("/getSixMonthOrdersSum", getSixMonthOrdersSum);
route.get("/getThisMonthOrders", getThisMonthOrders);
route.get("/getThisWeekOrders", getThisWeekOrders);
route.get("/getThisDayOrders", getThisDayOrders);
route.get("/getAllOrders", getAllOrders);
route.get("/deleteAll", deleteAll);
route.post("/getOrdersByDate", getOrdersByDate);

export default route;
