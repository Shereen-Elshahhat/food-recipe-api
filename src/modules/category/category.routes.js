import { Router } from "express";
import { addCategory, deleteCategory, getAllCategory, getOneCategory, updateCategory } from "./category.controller.js";
import { addCategoryValiditor, deleteCategoryValiditor, updateCategoryValiditor } from './categoryValidation.js';
import { validitor } from "../../middlware/Validator.js";

const categoryRouter= Router()

categoryRouter.route("/").post(validitor(addCategoryValiditor),addCategory).get(getAllCategory)
categoryRouter.route("/:id").put(validitor(updateCategoryValiditor),updateCategory).get(getOneCategory).delete(validitor(deleteCategoryValiditor),deleteCategory)


export{
    categoryRouter
}