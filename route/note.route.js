import { Note } from "../model/notes.model.js";
import express from "express"

const noteRouter=express.Router()

noteRouter.post("/add",async(req,res)=>{
    let {title,author,description,sex}=req.body
    try{
        let note=new Note({title,author,description,sex,userId:req.userid})
        await note.save()
        res.status(200).send("successfully created note")
    }catch(err){
        res.status(400).send("err in note add")
    }
})

noteRouter.get("/getting",async(req,res)=>{
    try{
        let not=await Note.find()
        res.status(200).json({not})
    }catch(err){
        res.status(400).send(`${err},error in getting value`)
    }
})

noteRouter.patch("/edit/:id",async(req,res)=>{
    try{
        let editId=req.params.id
        let sex="female"
        await Note.findByIdAndUpdate({_id:editId},{sex})
        res.status(200).send("succefully updated")
    }catch(err){
        res.status(400).send(`${err},error in edit`)
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    try{
        let deleteId=req.params.id
        await Note.findByIdAndDelete({_id:deleteId})
        res.status(200).send("succefully deleted")
    }catch(err){
        res.status(400).send("error in deleting")
    }
})


export {noteRouter}