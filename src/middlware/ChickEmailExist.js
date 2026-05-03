import { User } from "../../db/models/user.model.js"
import bcrypt from "bcrypt"

export const CheckEmail = async(req,res,next)=>{

        let isExist = await User.findOne({email:req.body.email})
        if(isExist) return res.json({message:"email is exist"})
        req.body.password = bcrypt.hashSync(req.body.password, 8)
        next()
}