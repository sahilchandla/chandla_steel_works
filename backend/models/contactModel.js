import mongoose from "mongoose";

let contactSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    number:{type:String,required:true},
    message:{type:String,required:true}
})

let Contact = mongoose.model("Contact", contactSchema);
export default Contact;