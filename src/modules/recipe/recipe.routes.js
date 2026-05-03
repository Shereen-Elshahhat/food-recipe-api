import { Router } from "express";
import { addRecipe, deleteRecipe, getAllRecipe, getOneRecipe, updateRecipe } from "./recipe.controller.js";
import { validateRecipe } from "../../middlware/ValidateRecipe.js";

const recipeRouter = Router()

recipeRouter.route("/").post(validateRecipe,addRecipe).get(getAllRecipe)
recipeRouter.route("/:id").put(updateRecipe).get(getOneRecipe).delete(deleteRecipe)

export{
    recipeRouter
}