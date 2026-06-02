import { AppError } from "../utils/AppError.js"
import jwt from 'jsonwebtoken'

export const verifyToken = (req,res,next)=>{
   console.log("HEADERS:", req.headers);

     let {token}= req.headers
     jwt.verify(token , "signInUser",async(error,decoded)=>{
     if(error){
        next(new AppError(error.message,401))
     }else{
              console.log("DECODED:", decoded);

        console.log(decoded)
        req.user = decoded
        next()
     }
})}
