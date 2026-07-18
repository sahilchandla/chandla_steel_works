import mongoose, { mongo } from "mongoose";

let userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"    
    }
})

let userModel = mongoose.model("user9",userSchema);

export default userModel;