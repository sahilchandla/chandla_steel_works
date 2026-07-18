import mongoose, { mongo } from "mongoose";

let productSchema = mongoose.Schema({
    pname:{type:String,required:true},
    price:{type:String,required:true},
    category:{type:String,required:true},
    company:{type:String,required:true},
    userId:{type:String,required:true},
    image:{type:String,required:true},
    description:{type:String,required:true}
})

let ProductModel = mongoose.model("productData",productSchema);

export default ProductModel;