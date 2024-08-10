import mongoose from "mongoose";

const registerSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
},{versionKey:false,timestamps:true})

const Register=mongoose.model("Register",registerSchema)

export {Register}