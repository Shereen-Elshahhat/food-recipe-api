import mongoose from "mongoose"
import { catchError } from "../src/middlware/catchError.js"
import { User } from "./models/user.model.js"
import bcrypt from "bcrypt"

export const dbconnect = async()=>{
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log("db connected successfully")
        seedAdmin()

    }catch (error){
        console.error("Database connection failed:", error)
    }
    
}

const seedAdmin = catchError(async(req,res,next)=>{
    let admin = await User.findOne({role:"admin"})

    if(!admin){
        await User.create({
            name:process.env.ADMIN_NAME,
            email:process.env.ADMIN_EMAIL,
            password:process.env.ADMIN_PASSWORD,
            role:"admin",
            age:25,
        })
        console.log("Admin Done")
        console.log("ADMIN_EMAIL =", process.env.ADMIN_EMAIL);
        console.log("ADMIN_PASSWORD =", process.env.ADMIN_PASSWORD);
    }
})