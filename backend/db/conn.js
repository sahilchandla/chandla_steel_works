import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connection done");
        console.log("Database:", mongoose.connection.name);
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });