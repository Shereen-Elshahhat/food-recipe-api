import { Router } from "express";
import { addRecipe, deleteRecipe, getAllRecipe, getOneRecipe, updateRecipe } from "./recipe.controller.js";
import { validateRecipe } from "../../middlware/ValidateRecipe.js";
import { uploadSingleFile } from "../../utils/Uploads.js";
import { validitor } from "../../middlware/Validator.js";
import { addRecipeValiditor, deleteRecipeValiditor, updateRecipeValiditor } from "./recipeValidation.js";
import { allowedTo, ProtectedRoute } from "../Auth/auth.controller.js";


const recipeRouter = Router()

recipeRouter.route("/").post(ProtectedRoute,allowedTo("admin"),uploadSingleFile("image"),validitor(addRecipeValiditor),validateRecipe,addRecipe).get(getAllRecipe)
recipeRouter.route("/:id").put(ProtectedRoute,allowedTo("admin"),uploadSingleFile("image"),validitor(updateRecipeValiditor),updateRecipe).get(getOneRecipe).delete(ProtectedRoute,allowedTo("admin"),validitor(deleteRecipeValiditor),deleteRecipe)

export{
    recipeRouter
}