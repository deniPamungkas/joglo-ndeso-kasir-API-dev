import { Router } from "express";
import {
  addNewMenu,
  deleteAll,
  deleteProduct,
  editMenu,
  getAllProducts,
  updateMenu,
} from "../controllers/admin.js";
import { authenticateToken } from "../middlewares/jwt.js";

const route = Router();
route.get("/", authenticateToken, getAllProducts);
route.post("/", authenticateToken, addNewMenu);
route.delete("/", authenticateToken, deleteProduct);
route.post("/editProduct", editMenu);
route.patch("/:id", authenticateToken, updateMenu);
route.get("/deleteAll", deleteAll);

export default route;
