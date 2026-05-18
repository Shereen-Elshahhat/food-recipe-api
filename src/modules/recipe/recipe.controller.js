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
        if (data.image) {data.image = `${req.protocol}://${req.get("host")}/uploads/recipes/${data.image}`}
        
        res.status(201).json({message:"added successfully" , data})

})

////////////////////////////////
const getAllRecipe =catchError( async(req,res) =>{

        let data = await Recipe.find().populate("categoryId").populate("userId")
        // data.forEach((recipe)=>{
        //    if(recipe.image){ recipe.image = `/uploads/recipes/${recipe.image}`}    ///use mapping because getall function return array not object
        // })
        data = data.map(recipe => {
            const obj = recipe.toObject();
             if(obj.image){ obj.image =`${req.protocol}://${req.get("host")}/uploads/recipes/${obj.image}`}
             return obj;
             })
        res.status(200).json({message:"success" , data})

})

////////////////////////////////
const getOneRecipe =catchError( async(req,res,next) =>{

        let {id} = req.params
        let data = await Recipe.findById(id)
        if(data){return res.status(200).json({message:"success", data})}
        if (data.image) {data.image = `${req.protocol}://${req.get("host")}/uploads/recipes/${data.image}`}
        next(new AppError("Recipe not found",404))
})

////////////////////////////////
const updateRecipe = catchError( async(req,res,next) =>{
        let {id} = req.params
        const updateData = {}
        if(req.body.title){updateData.title = req.body.title}
        if(req.body.description){updateData.description = req.body.description}     // هنا انا بحدد اي الحاجات اللي اقدر اعدلها 
        if(req.file){updateData.image = req.file.filename}
        
        let data = await Recipe.findByIdAndUpdate(id,updateData,{new:true})
        if(data){return res.status(200).json({message:"updated successfully" , data})}
        if (data.image) {data.image = `${req.protocol}://${req.get("host")}/uploads/recipes/${data.image}`}
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