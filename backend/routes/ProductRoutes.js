import { Router } from "express";
import { AddProduct, deleteProducts, getProducts, getSingleProduct, searchData, updateProducts, validationAdd } from "../controllers/ProductControllers.js";
import { isAdmin, verifyToken } from "../controllers/userControllers.js";
import upload from "../middleware/multer.js";
let productRoutes = Router();

productRoutes.post("/add",upload.single("image"),verifyToken,isAdmin,validationAdd,AddProduct);
productRoutes.get("/get",getProducts);
productRoutes.delete("/remove/:id",verifyToken,isAdmin,deleteProducts);
productRoutes.get("/get/:id",getSingleProduct);
productRoutes.get("/search/:key",searchData);

productRoutes.put("/edit/:id",upload.single("image"),verifyToken,isAdmin,updateProducts);





export default productRoutes;