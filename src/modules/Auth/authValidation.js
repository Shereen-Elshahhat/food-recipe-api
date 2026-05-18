import Joi from "joi";


export const signUpValiditor = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,30}$/).required(),
    rePassword:Joi.valid(Joi.ref("password")).required(),
    age:Joi.number().min(16).max(60).required()
})

export const loginValiditor = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[A-Z][A-Za-z0-9]{8,30}$/).required(),
})