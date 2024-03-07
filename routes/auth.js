import { Router } from "express";
import { login, logout, signUp, verifyEmail } from "../controllers/auth.js";

const route = Router();

route.post("/login", login);
route.post("/signUp", signUp);
route.post("/logout", logout);
route.get("/verify/:token", verifyEmail);

export default route;
