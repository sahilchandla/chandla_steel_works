import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import pkg from "multer-storage-cloudinary";

const CloudinaryStorage = pkg.CloudinaryStorage;

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,

    params: {
        folder: "Products_Images",
        allowed_formats: ["jpg", "jpeg", "png", "WEBP", "AVIF"]
    }
});

const upload = multer({ storage });

export default upload;