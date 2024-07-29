import { Router } from "express";
import { isLoggedInAuth, login, logout, signUp } from "../controllers/auth.js";
import { authenticateToken, isLoggedIn } from "../middlewares/jwt.js";

const route = Router();

route.post("/login", isLoggedIn, login);
route.post("/signUp", signUp);
route.post("/logout", authenticateToken, logout);
route.get("/is-logged-in", isLoggedInAuth);

export default route;
