import { Router } from "express";
import { addCategory, deleteCategory, getAllCategory, getOneCategory, updateCategory } from "./category.controller.js";
import { addCategoryValiditor, deleteCategoryValiditor, updateCategoryValiditor } from './categoryValidation.js';
import { validitor } from "../../middlware/Validator.js";
import { allowedTo, ProtectedRoute } from "../Auth/auth.controller.js";

const categoryRouter= Router()

categoryRouter.route("/").post(ProtectedRoute,allowedTo("admin"),validitor(addCategoryValiditor),addCategory).get(getAllCategory)
categoryRouter.route("/:id").put(ProtectedRoute,allowedTo("admin"),validitor(updateCategoryValiditor),updateCategory).get(getOneCategory).delete(ProtectedRoute,allowedTo("admin"),validitor(deleteCategoryValiditor),deleteCategory)


export{
    categoryRouter
}