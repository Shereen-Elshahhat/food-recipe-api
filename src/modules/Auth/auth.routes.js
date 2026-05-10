import { Router } from "express";

import { CheckEmail } from './../../middlware/CheckEmailExist.js';
import { Login, register } from "./auth.controller.js";

const authRouter = Router()

// authRouter.route("/signup").post(CheckEmailsignUp)
authRouter.post("/register",CheckEmail,register)
authRouter.post("/login",Login)

export{authRouter}