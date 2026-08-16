import express from 'express';

let app = express();

app.use(express.json());

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

import cors from 'cors';

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://chandla-steel-works-1.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

import "./db/conn.js";


import orderRoutes from './routes/OrderRoutes.js';


import userRoutes from './routes/userRoutes.js';

import productRoutes from './routes/ProductRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api",contactRoutes)

app.get("/", (req, res) => {
    res.send("Chandla Steel Works Backend is Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

