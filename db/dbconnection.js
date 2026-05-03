import mongoose from "mongoose"

export const dbconnect = async()=>{
    try{
        await mongoose.connect(process.env.DB_URI)
        console.log("db connected successfully")
    }catch (error){
        console.error("Database connection failed:", error)
    }
    
}