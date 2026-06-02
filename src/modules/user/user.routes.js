import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getDashboard, getOneUser, updateUser } from "./user.controller.js";
import { CheckEmail } from "../../middlware/CheckEmailExist.js";
import { addUserValiditor, deleteUserValiditor, updateUserValiditor } from "./userValidation.js";
import { validitor } from './../../middlware/Validator.js';
import { allowedTo, ProtectedRoute } from "../Auth/auth.controller.js";

const userRouter = Router()
userRouter.use(ProtectedRoute)
userRouter.route("/dashboard").get(allowedTo("admin"),getDashboard)

userRouter.route("/").post(allowedTo("admin"),validitor(addUserValiditor),CheckEmail,addUser).get(allowedTo("admin"),getAllUsers)
userRouter.route("/:id").get(allowedTo("admin","user"),getOneUser).put(allowedTo("admin","user"),validitor(updateUserValiditor),updateUser).delete(allowedTo("admin"),validitor(deleteUserValiditor),deleteUser)

export{
    userRouter
}