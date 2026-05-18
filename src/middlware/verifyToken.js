import { AppError } from "../utils/AppError"

export const verifyToken = ()=>{
     let {token}= req.headers
     jwt.verify(token , "signInUser",async(error,decoded)=>{
     if(error){
        next(new AppError(error,401))
     }else{
        console.log(decoded)
        req.user = decoded
        next()
     }
})}