import { Recipe } from "../../../db/models/recipe.model.js"
import { AppError } from "../../utils/AppError.js";
import { catchError } from './../../middlware/catchError.js';

const addRecipe = catchError(async(req,res) =>{

        if (req.file) {
          req.body.image = req.file.filename
        }
        let data = new Recipe(req.body)
        await data.save()
        await data.populate(["userId", "categoryId"]);
        if (data.image) {data.image = `/uploads/recipes/${data.image}`}
        
        res.status(201).json({message:"added successfully" , data})

})

////////////////////////////////
const getAllRecipe =catchError( async(req,res) =>{

        let data = await Recipe.find().populate("categoryId").populate("userId")
        data.forEach((recipe)=>{
           if(recipe.image){ recipe.image = `/uploads/recipes/${recipe.image}`}    ///use mapping because getall function return array not object
        })
        res.status(200).json({message:"success" , data})

})

////////////////////////////////
const getOneRecipe =catchError( async(req,res,next) =>{

        let {id} = req.params
        let data = await Recipe.findById(id)
        if (data.image) {data.image = `/uploads/recipes/${data.image}`}
        if(data){return res.status(200).json({message:"success", data})}
        next(new AppError("Recipe not found",404))
})

////////////////////////////////
const updateRecipe = catchError( async(req,res,next) =>{
        let {id} = req.params
        if (req.file) {
          req.body.image = req.file.filename

        }
        let data = await Recipe.findByIdAndUpdate(id,req.body,{new:true})
        if (data.image) {data.image = `/uploads/recipes/${data.image}`}
        if(data){return res.status(200).json({message:"updated successfully" , data})}
        next(new AppError("Recipe not found",404))
       
})

////////////////////////////////
const deleteRecipe =catchError( async(req,res,next) =>{

        let {id} = req.params
        let data = await Recipe.findByIdAndDelete(id)
        if(data){return res.status(200).json({message:"deleted successfully" , data})}
        next(new AppError("Recipe not found",404))

})


export{
    addRecipe,
    getAllRecipe,
    getOneRecipe,
    updateRecipe,
    deleteRecipe
}