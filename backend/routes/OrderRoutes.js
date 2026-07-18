import { Router} from "express";
import express from "express";
import {
    createOrder,
    getOrders,
    updateOrderStatus
} from "../controllers/OrderController.js";

import {
    verifyToken,
    isAdmin
} from "../controllers/userControllers.js";

const orderRoutes = Router();

// Customer Order Place
orderRoutes.post(
    "/create",
    verifyToken,
    createOrder
);

// Admin - Get All Orders
orderRoutes.get(
    "/",
    verifyToken,
    isAdmin,
    getOrders
);

// Admin - Update Order Status
orderRoutes.put(
    "/update/:id",
    verifyToken,
    isAdmin,
    updateOrderStatus
);

export default orderRoutes;