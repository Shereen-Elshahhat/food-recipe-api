import { User } from "../../../db/models/user.model.js"
import { catchError } from "../../middlware/catchError.js"
import  bcrypt  from 'bcrypt';
import { AppError } from "../../utils/AppError.js";

const register = catchError(async(req,res)=>{
    let data = new User(req.body)
    await data.save()
    res.status(201).json({message:"success",data})
})

const Login = catchError(async(req,res,next)=>{
    const isExist = await User.findOne({email:req.body.email}).select("+password")
    if(isExist && (await bcrypt.compare(req.body.password, isExist.password))){
       return res.status(200).json({message:"success login with token"});
    }else{ 
    //    return res.status(404).json({message:"incorrect email or password"});
        next(new AppError("incorrect email or password",404))
    }
})

export{
    register,
    Login
}