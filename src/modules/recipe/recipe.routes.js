import { Router } from "express";
import { addRecipe, deleteRecipe, getAllRecipe, getOneRecipe, updateRecipe } from "./recipe.controller.js";
import { validateRecipe } from "../../middlware/ValidateRecipe.js";
import { uploadSingleFile } from "../../utils/Uploads.js";


const recipeRouter = Router()

recipeRouter.route("/").post(uploadSingleFile("image"),validateRecipe,addRecipe).get(getAllRecipe)
recipeRouter.route("/:id").put(uploadSingleFile("image"),updateRecipe).get(getOneRecipe).delete(deleteRecipe)

export{
    recipeRouter
}