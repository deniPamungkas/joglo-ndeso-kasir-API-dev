import { Router } from "express";
import { login, logout, signUp } from "../controllers/auth.js";
import { authenticateToken, isLoggedIn } from "../middlewares/jwt.js";

const route = Router();

route.post("/login", isLoggedIn, login);
route.post("/signUp", signUp);
route.post("/logout", authenticateToken, logout);

export default route;
