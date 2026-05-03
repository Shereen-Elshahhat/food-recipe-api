import { Router } from "express";
import { validateFavRecipe } from "../../middlware/ValidateFavRecipe.js";
import { addFavRecipe, getAllFavRecipe, getOnefav, removeFromFav } from "./favorite.controller.js";

const favRecipeRouter = Router()

favRecipeRouter.route("/").post(validateFavRecipe,addFavRecipe).get(getAllFavRecipe)
favRecipeRouter.route("/:id").get(getOnefav).delete(removeFromFav)

export{
    favRecipeRouter
}