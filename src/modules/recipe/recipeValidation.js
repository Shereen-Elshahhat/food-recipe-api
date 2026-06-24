import Joi from "joi";


export const addRecipeValiditor = Joi.object({
    title:Joi.string().min(3).max(30).required(),
    description:Joi.string().min(3).max(500).required(),
    price:Joi.number().required(),
    createdBy:Joi.string().hex().length(24).required(),
    categoryId:Joi.string().hex().length(24).required(),
    image:Joi.object({
        fieldname:Joi.string(),
        originalname:Joi.string(),
        encoding:Joi.string(),
        filename:Joi.string(),
        path:Joi.string(),
        minetype:Joi.string().valid("image/jpeg","image/png"),
        destination:Joi.string(),
        size:Joi.number().max(900000000000000),
    }).required(),
})

export const updateRecipeValiditor = Joi.object({
    id: Joi.string().hex().length(24).required(),
    title: Joi.string().min(3).max(30),
    description: Joi.string().min(3).max(500),
    image: Joi.object(),
})

export const deleteRecipeValiditor = Joi.object({
    id:Joi.string().hex().length(24).required(),
    image:Joi.object().required(),
})