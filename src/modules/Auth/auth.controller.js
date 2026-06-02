import { User } from "../../../db/models/user.model.js"
import { catchError } from "../../middlware/catchError.js"
import  bcrypt  from 'bcrypt';
import { AppError } from "../../utils/AppError.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'


const register = catchError(async(req,res)=>{
        const {name , email , password} = req.body 
        let data = new User({name , email , password})
        await data.save()
        res.status(201).json({message:"success",data:{name:data.name, email:data.email}})
    
})

const Login = catchError(async(req,res,next)=>{
    const isExist = await User.findOne({email:req.body.email}).select("+password")
    if(isExist && (await bcrypt.compare(req.body.password, isExist.password))){
        jwt.sign({id:isExist._id,name:isExist.name,role:isExist.role},process.env.JWT_SECERT,(error,token)=>{
                   return res.status(200).json({message:"success login with token"  ,token});
        })
    }else{ 
    //    return res.status(404).json({message:"incorrect email or password"});
        next(new AppError("incorrect email or password",404))
    }
})

const ProtectedRoute = catchError(async(req,res,next)=>{
    //check if token is exist
    let {token} = req.headers
   
    let payload= jwt.verify(token,process.env.JWT_SECERT)
    let user = await User.findById(payload.id)
    if(!user) return next(new AppError("User not found",404))
        req.user = user
        if(user.passwordChangeAt){
            const changePasswordTime = parseInt(user.passwordChangeAt.getTime()/1000,10)
            if(payload.iat < changePasswordTime) return next (new AppError("token expired"))
        }
    next()
})
 

const allowedTo =(...roles)=>{
    return catchError(async(req,res,next)=>{
       if(roles.includes(req.user.role)) return next()
        return next(new AppError("you are not allowed to access this role",403))

})}


///////forget password///////
const forgetPassword = catchError(async(req,res,next)=>{
    let {email} = req.body
    let isExist = await User.findOne({email})
    if(!isExist) return next(new AppError("User not found with this email",404))
        const generatedOTP = Math.floor(10000 + Math.random()*90000).toString()
        
    let salt = await bcrypt.genSalt(8)
    isExist.otp =await bcrypt.hash(generatedOTP,salt)
    isExist.optExpires = Date.now() + 10 * 60 * 1000
    isExist.isOTPVerified = false

    console.log(isExist.password);
    await isExist.save()

    /////create 
    const transportere = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.USER_EMAIL,
            pass:process.env.USER_PASSWORD
        }
    })
    const info =await transportere.sendMail({
        from: `"food Recipe App "<${process.env.USER_EMAIL}>` ,     //Sender 
        to: isExist.email,
        subject:"your password reset code (valid for 9 min)",
        text: `"your OTP code is :${generatedOTP}"`
    });
    res.status(200).json({message:"success otp sent"})
})

///////verify /////////////
const verifyOTP = catchError(async(req,res,next)=>{
    let {email,otp} = req.body
    let user = await User.findOne({email})
    if(!user) return next (new AppError("user not found"))
    if(Date.now() > user.optExpires) return next (new AppError("otp is expired, please try now"))
       let match = bcrypt.compare(otp,user.otp)
       if(!match) return next (new AppError("invalid otp code",404))
       user.isOTPVerified = true
       await user.save()
       res.status(200).json({message:"success" , description :"OTP verified successfully , you can reset password"})

})


///////reset ///////////////
const resetPassword = catchError(async(req,res,next)=>{
    let {email,password} = req.body
    let user = await User.findOne({email})
    if(!user) return next (new AppError("user not found",404))
    if(!user.isOTPVerified)   return next (new AppError("please verify your otp first")) 
       user.password = password
       user.passwordChangeAt = Date.now()
       user.otp = undefined
       user.optExpires = undefined
       user.isOTPVerified = undefined

       await user.save()
       res.status(200).json({message:"success" , description :"password reset successfully"})

})



export{
    register,
    Login,
    ProtectedRoute,
    allowedTo,
    forgetPassword,
    verifyOTP,
    resetPassword
}