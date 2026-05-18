import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getOneUser, updateUser } from "./user.controller.js";
import { CheckEmail } from "../../middlware/CheckEmailExist.js";
import { addUserValiditor, deleteUserValiditor, updateUserValiditor } from "./userValidation.js";
import { validitor } from './../../middlware/Validator.js';

const userRouter = Router()

userRouter.route("/").post(validitor(addUserValiditor),CheckEmail,addUser).get(getAllUsers)
userRouter.route("/:id").get(getOneUser).put(validitor(updateUserValiditor),updateUser).delete(validitor(deleteUserValiditor),deleteUser)

export{
    userRouter
}