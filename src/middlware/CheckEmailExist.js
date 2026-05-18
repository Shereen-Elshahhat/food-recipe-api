import { User } from "../../db/models/user.model.js"
import bcrypt from "bcrypt"

export const CheckEmail = async(req,res,next)=>{
        try {
             const { email, password} = req.body   
             if(!email || !password) {
                return res.status(400).json({ message: "Email and password are required" })
             }
             
             const isExist = await User.findOne({ email })
             if (isExist) {
                 return res.status(400).json({ message: "Email already exists" })
             }
            //  req.body.password = await bcrypt.hash(password, 8)
             next()
        } catch (error) {
           next(error)
        }
}


