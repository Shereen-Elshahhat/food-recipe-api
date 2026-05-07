import { Recipe } from "../../db/models/recipe.model.js";
import { User } from "../../db/models/user.model.js";

export const validateFavRecipe = async (req,res,next) => {
    try { 
        const { userId, recipeId } = req.body;

        const user = await User.findById(userId);
         if (!user) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        const recipe = await Recipe.findById(recipeId);
         if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        
        next(); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}