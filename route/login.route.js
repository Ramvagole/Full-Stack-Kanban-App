import dotenv from "dotenv"
import express from "express"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
import { Register } from "../model/register.model.js"
let logRouter=express.Router()
dotenv.config()

logRouter.post("/register",async(req,res)=>{
    let {name,email,password}=req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                return res.status(400).send(`${err},error in hash of bcrypt`)
            }
            let user=new Register({name,email,password:hash})
            await user.save()
            return res.status(200).send("successfully registered")
        })
    }catch(err){
        res.status(400).send(`${err}, error in register`)
    }
})

logRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body
    try{
        let user=await Register.findOne({email})
        if(!user){
            return res.status(400).send(`There is no such user please register before login..`)
        }
        bcrypt.compare(password,user.password,async(err,result)=>{
            if(err){
                return res.status(400).send("password is not enterd correct once agian login")
            }
            if(result){
                let token=jwt.sign({id:user._id},process.env.KEY)
                return res.status(200).json({message:"succcessfully login",token})
            }else{
                res.status(400).send("enter the correct password")
            }
        })
    }catch(err){
        res.status(400).send(`${err}, error in login `)
    }
})


export {logRouter}