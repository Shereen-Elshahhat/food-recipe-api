import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getOneUser, updateUser } from "./user.controller.js";
import { CheckEmail } from "../../middlware/ChickEmailExist.js";

const userRouter = Router()

userRouter.route("/").post(CheckEmail,addUser).get(getAllUsers)
userRouter.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser)

// userRouter.post("/",CheckEmail,addUser)
// userRouter.get("/",getAllUsers)
// userRouter.get("/:id",getOneUser)
// userRouter.put("/:id",updateUser)
// userRouter.delete("/:id",deleteUser)

export{
    userRouter
}