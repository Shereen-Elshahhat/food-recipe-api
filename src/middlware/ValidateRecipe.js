import { Category } from "../../db/models/category.model.js";
import { User } from "../../db/models/user.model.js";

export const validateRecipe = async (req, res, next) => {
    try {
        const { title, userId, categoryId, description } = req.body;

        if (!title || !userId || !categoryId || !description ) {
            return res.status(400).json({ message: "Missing required fields" });
        }
       
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        next(); 

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};