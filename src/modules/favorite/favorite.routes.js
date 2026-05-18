import { Router } from "express";
import { validateFavRecipe } from "../../middlware/ValidateFavRecipe.js";
import { addFavRecipe, getAllFavRecipe, getOnefav, removeFromFav } from "./favorite.controller.js";
import { validitor } from './../../middlware/Validator.js';
import { addFavValiditor, deleteFavtValiditor } from "./favoriteValidation.js";
import { verifyToken } from "../../middlware/verifyToken.js";

const favRecipeRouter = Router()

favRecipeRouter.route("/").post(validitor(addFavValiditor),verifyToken,validateFavRecipe,addFavRecipe).get(verifyToken,getAllFavRecipe)
favRecipeRouter.route("/:id").get(getOnefav).delete(validitor(deleteFavtValiditor),removeFromFav)

export{
    favRecipeRouter
}