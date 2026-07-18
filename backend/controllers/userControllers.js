import { body, validationResult } from "express-validator"
import bcrypt from 'bcryptjs';
import userModel from "../models/userModel.js";

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


let validationSignup = [
    body("name").isLength({ min: 2 }).withMessage("name must be atleast two characters"),
    body("email").isEmail().withMessage("Enter valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be atleast six characters").matches(/[0-9]/).withMessage("Password must be contain digit")
        .matches(/[A-Z]/).withMessage("Password must contain upper letter")
]

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ message: errors.array()[0].msg })
    try {
        let { name, email, password } = req.body;
        let exists = await userModel.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already exists!" });

        let hashpassword = await bcrypt.hash(password, 10);//add salt

        let data = await userModel.create({ name, email, password: hashpassword, role: "user" })
        res.status(200).json({ message: "Signup Successfully", user9: { _id: data._id, name, email }, success: true });

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}



let validationLogin = [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password Requierd")
]

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ message: errors.array()[0].msg })
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" })

        let passMatch = await bcrypt.compare(password, user.password)
        if (!passMatch) return res.status(400).json({ message: "Enter valid Password" })


        jwt.sign({ user: { _id: user._id, name: user.name, email, role: user.role } }, process.env.SECRET_KEY, { expiresIn: "12h" }, (err, token) => {
            res.status(200).json({ message: "Login Successful", user: { _id: user._id, name: user.name, email, role: user.role }, success: true, token: token });
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

let verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // console.log(" AUTH HEADER:", authHeader);

        if (!authHeader) {
            return res.status(401).json({ error: "Token missing" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // console.log(" DECODED TOKEN:", decoded);

        req.user = decoded.user; // IMPORTANT

        if (!req.user) {
            return res.status(401).json({ error: "User not found in token" });
        }

        next();

    } catch (err) {
        console.log(" VERIFY ERROR:", err.message);
        return res.status(401).json({ error: "Invalid token" });
    }
};

let isAdmin = (req, res, next) => {
    // console.log("ROLE CHECK:", req.user?.role);

    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin only" });
    }

    next();
};


export { signup, validationSignup, login, validationLogin, verifyToken, isAdmin };