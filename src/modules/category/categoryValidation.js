import Joi from "joi";


export const addCategoryValiditor = Joi.object({
    name:Joi.string().min(3).max(30).required(),
})

export const updateCategoryValiditor = Joi.object({
    name:Joi.string().min(3).max(50).required(),
    id:Joi.string().hex().length(24).required(),
})

export const deleteCategoryValiditor = Joi.object({
    id:Joi.string().required(),
})