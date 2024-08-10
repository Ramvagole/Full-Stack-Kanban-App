import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export async function check(req,res,next){
    let token=req.headers.authorization
    if(!token){
        return res.status(400).send(`not enterd token`)
    }
    try{
        jwt.verify(req.headers.authorization,process.env.KEY,async(err,decode)=>{
            if(err){
                console.log(err)
                return res.status(400).send("error in token")
            }
            req.userid=decode.id
            next()
        })
    }catch(err){
        res.status(400).send(`${err}, error in authorization`)
    }
}