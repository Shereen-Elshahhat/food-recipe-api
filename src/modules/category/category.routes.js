import { Router } from "express";
import { addCategory, deleteCategory, getAllCategory, getOneCategory, updateCategory } from "./category.controller.js";

const categoryRouter= Router()

categoryRouter.route("/").post(addCategory).get(getAllCategory)
categoryRouter.route("/:id").put(updateCategory).get(getOneCategory).delete(deleteCategory)
// categoryRouter.post("/category", addCategory)
// categoryRouter.get("/category", getAllCategory)
// categoryRouter.get("/category/:id", getOneCategory)
// categoryRouter.put("/category/:id", updateCategory)
// categoryRouter.delete("/category/:id", deleteCategory)

export{
    categoryRouter
}