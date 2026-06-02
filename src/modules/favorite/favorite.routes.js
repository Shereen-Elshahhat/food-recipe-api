import { Router } from "express";
import { addFavRecipe, getAllFavRecipe, getOnefav, removeFromFav } from "./favorite.controller.js";
import { validitor } from './../../middlware/Validator.js';
import { addFavValiditor, deleteFavtValiditor } from "./favoriteValidation.js";
import { verifyToken } from "../../middlware/verifyToken.js";
import { allowedTo, ProtectedRoute } from "../Auth/auth.controller.js";

const favRecipeRouter = Router()
favRecipeRouter.use(ProtectedRoute)
favRecipeRouter.use(allowedTo("admin","user"))

favRecipeRouter.route("/").post(validitor(addFavValiditor),verifyToken,addFavRecipe).get(verifyToken,getAllFavRecipe)
favRecipeRouter.route("/:id").get(getOnefav).delete(validitor(deleteFavtValiditor),removeFromFav)

export{
    favRecipeRouter
}