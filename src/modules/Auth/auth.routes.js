import { Router } from "express";

import { CheckEmail } from './../../middlware/CheckEmailExist.js';
import { Login, register } from "./auth.controller.js";
import { validitor } from "../../middlware/Validator.js";
import { loginValiditor, signUpValiditor } from "./authValidation.js";

const authRouter = Router()

// authRouter.route("/signup").post(CheckEmailsignUp)
authRouter.post("/register",validitor(signUpValiditor),CheckEmail,register)
authRouter.post("/login",validitor(loginValiditor),Login)

export{authRouter}