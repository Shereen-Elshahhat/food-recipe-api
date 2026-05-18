import { User } from "../../../db/models/user.model.js"
import { catchError } from "../../middlware/catchError.js"
import  bcrypt  from 'bcrypt';
import { AppError } from "../../utils/AppError.js";
import jwt from 'jsonwebtoken'

const register = catchError(async(req,res)=>{
        const {name , email , password} = req.body 
        let data = new User({name , email , password})
        await data.save()
        res.status(201).json({message:"success",data:{name:data.name, email:data.email}})
    
})

const Login = catchError(async(req,res,next)=>{
    const isExist = await User.findOne({email:req.body.email}).select("+password")
    if(isExist && (await bcrypt.compare(req.body.password, isExist.password))){
        jwt.sign({id:isExist._id,name:isExist.name,role:isExist.role},"signInUser",(error,token)=>{
                   return res.status(200).json({message:"success login with token"  ,token});
        })
    }else{ 
    //    return res.status(404).json({message:"incorrect email or password"});
        next(new AppError("incorrect email or password",404))
    }
})
 
export{
    register,
    Login
}