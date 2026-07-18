import { body, validationResult } from "express-validator"
import ProductModel from "../models/ProductModel.js"

let validationAdd = [
    body("pname").notEmpty().withMessage("Product name is required")
        .isLength({ min: 3, max: 50 }).withMessage("Product name must be between 3 to 50 characters"),

    body("price").notEmpty().withMessage("Price is required")
        .isNumeric().withMessage("Price Must be a number").isFloat({ min: 1, max: 100000 })
        .withMessage("Price must be between 1 and 100000"),

    body("category").notEmpty().withMessage("Category is required")
        .isIn(["Single Door Frame", "Double Door Frame", "Window Frame", "Main Gate", "Sliding Gate", "Stair Railing", "Balcony Railing",
            "Window Grill", "other"]).withMessage("Invalid Category"),

    body("description").notEmpty().withMessage("Description is required")
        .isLength({ min: 10, max: 500 }).withMessage("Description must be between 10 to 500 characters"),

    body("company").notEmpty().withMessage("Company is required")
        .isIn(["TATA Steel", "Jindal South West", "Chandla Welding Works", "other"]).withMessage("Invalid Company name"),

    body("userId").notEmpty().withMessage("User ID is required")
        .isMongoId().withMessage("Invalid user ID"),

     // image validation
    body("image").custom((value,{req})=>{

        if(!req.file){
            throw new Error("Image is required");
        }

        return true;

    })

]

let AddProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ message: errors.array() })
    try {
        let data = await ProductModel.create({
            pname: req.body.pname,
            price: req.body.price,
            category: req.body.category,
            company: req.body.company,
            description: req.body.description,
            userId: req.body.userId,
            image: req.file.path
        });
        res.status(200).json({ message: "Product successfully add", success: true, data })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "server Error" })
    }

}

let getProducts = async (req, res) => {
    try {
        let data = await ProductModel.find();
        if (data.length > 0) {
            res.status(200).json(data);
        }
        else {
            res.status(404).json({ message: "Product not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "server error" });
    }
}

let deleteProducts = async (req, res) => {
    try {
        let data = await ProductModel.deleteOne({ _id: req.params.id })
        console.log(data)
        if (data.deletedCount === 0) {
            return res.status(404).json({ message: "Product Not Found" });;
        }
        res.status(200).json({ message: "Product successfully deleted", success: true });
    }
    catch (err) {
        res.status(500).json({ message: "server error" });
    }
}


//this getsingleproduct made for prefill data in the form
let getSingleProduct = async (req, res) => {

    try {
        let data = await ProductModel.findById(req.params.id);

        if (!data) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(data);
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" });
    }
}

let updateProducts = async (req, res) => {

    try {

        let updateData = {

            pname: req.body.pname,
            price: req.body.price,
            category: req.body.category,
            company: req.body.company,
            description: req.body.description

        }

        // new image upload
        if (req.file) {

            updateData.image = req.file.path;

        }

        let data = await ProductModel.findOneAndUpdate(

            { _id: req.params.id },

            updateData,

            { new: true }

        );

        if (!data) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        res.status(200).json({

            message: "Product successfully updated",

            success: true

        });

    }

    catch (err) {

        console.log(err);

        res.status(500).json({
            message: "server error"
        });

    }

}
let searchData = async(req,res)=>{
    try{
        let key = req.params.key;
        // console.log(key)
        let data = await ProductModel.find({
            $or:[
                {pname:{$regex:key,$options:"i"}},
                {company:{$regex:key,$options:"i"}},
                {category:{$regex:key,$options:"i"}}
            ]
        })
        res.status(200).json({success:true,data})
    }
    catch(err){
        res.status(500).json({ message: "server error" });
    }

}

export { AddProduct, validationAdd, getProducts, deleteProducts, getSingleProduct, updateProducts,searchData }