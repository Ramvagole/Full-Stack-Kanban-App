import mongoose from "mongoose";

const noteSchema=new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    description:{type:String,required:true},
    sex:{type:String,enum:["male","female","other"],required:true,default:"other"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"Register"}
},{versionKey:false,timestamps:true})

const Note=mongoose.model("Note",noteSchema)

export {Note}