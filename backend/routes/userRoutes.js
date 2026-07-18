import { Router } from "express";
import { login, signup, validationLogin, validationSignup } from "../controllers/userControllers.js";

let userRoutes = Router();

userRoutes.post("/signup",validationSignup,signup);
userRoutes.post("/login",validationLogin,login);
export default userRoutes;