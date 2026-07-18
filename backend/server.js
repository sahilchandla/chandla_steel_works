import express from 'express';

let app = express();

app.use(express.json());

import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
app.use(cors({origin:"http://localhost:5173"}));

import "./db/conn.js";


import orderRoutes from './routes/OrderRoutes.js';


import userRoutes from './routes/userRoutes.js';

import productRoutes from './routes/ProductRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api",contactRoutes)

app.listen(process.env.PORT,()=>{
    console.log("server run")
})