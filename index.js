import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import mongoose from "mongoose"
import { logRouter } from "./route/login.route.js"
import { noteRouter } from "./route/note.route.js"
import { check } from "./middleware/auth.middle.js"
const app=express()


app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/reg",logRouter)
app.use("/not",check,noteRouter)


app.listen(process.env.PORT,async()=>{
    try{
        await mongoose.connect(process.env.URL)
        console.log(`hosted on port ${process.env.PORT} and also connected to mongodb`)
    }catch(err){
        console.log(`${err}, in listen`)
    }
})