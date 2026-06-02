import { Router } from "express";

import { CheckEmail } from './../../middlware/CheckEmailExist.js';
import { forgetPassword, Login, register, resetPassword, verifyOTP } from "./auth.controller.js";
import { validitor } from "../../middlware/Validator.js";
import { forgetPassValiditor, loginValiditor, resetPasswordVal, signUpValiditor, verifyOTPVal } from "./authValidation.js";

const authRouter = Router()

// authRouter.route("/signup").post(CheckEmailsignUp)
authRouter.post("/register",validitor(signUpValiditor),CheckEmail,register)
authRouter.post("/login",validitor(loginValiditor),Login)
authRouter.post("/forgetPassword",validitor(forgetPassValiditor),forgetPassword)
authRouter.post("/verifyOTP",validitor(verifyOTPVal),verifyOTP)
authRouter.post("/resetpassword",validitor(resetPasswordVal),resetPassword)

export{authRouter}