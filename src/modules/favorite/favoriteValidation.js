import Joi from "joi";


export const addFavValiditor = Joi.object({
    recipeId:Joi.string().hex().length(24).required(),
})

export const deleteFavtValiditor = Joi.object({
    id:Joi.string().hex().length(24).required(),
})