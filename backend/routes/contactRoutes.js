import { Router } from "express";
import { contactUser, getContact } from "../controllers/contactController.js";

let contactRoutes = Router();
contactRoutes.post("/contact",contactUser);
contactRoutes.get("/getcontact",getContact);

export default contactRoutes;