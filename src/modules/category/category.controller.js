import { Category } from "../../../db/models/category.model.js"
import { AppError } from "../../utils/AppError.js";
import { catchError } from './../../middlware/catchError.js';

const addCategory =catchError(async(req,res)=>{
        // let data = new Category.insertMany(req.body)
        let data = new Category(req.body)
        await data.save()
        res.status(201).json({message:"category created successfully" , data})
})

////////////////////////////////
const getAllCategory = catchError( async(req,res)=>{

        let data = await Category.find()
        res.status(200).json({message:"All Categories" , data})
})

/////////////////////////////////
const getOneCategory = catchError( async(req,res,next)=>{

        let {id} =req.params
        let data = await Category.findById(id)
        if(data){ return res.status(200).json({message:"get one category" , data})}
        next(new AppError("Category not found",404))
        

})

/////////////////////////////////
const updateCategory = catchError(async(req,res,next)=>{

        let {id} =req.params
        let data = await Category.findByIdAndUpdate(id,req.body,{new:true})
        if(data){ return res.status(201).json({message:"updated successfully" , data})}
        next(new AppError("Category not found",404))
})

////////////////////////////////
const deleteCategory = catchError( async(req,res,next)=>{

        let {id} =req.params
        let data = await Category.findByIdAndDelete(id)
        if(data){ return res.status(200).json({message:"the item is deleted successfully" , data})}
        next(new AppError("Category not found",404))
})


export{
    addCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
    deleteCategory
}