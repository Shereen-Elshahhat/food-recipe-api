import { Recipe } from "../../../db/models/recipe.model.js"
import { AppError } from "../../utils/AppError.js";
import { catchError } from './../../middlware/catchError.js';

const addRecipe = catchError(async(req,res,next) =>{

        if (req.file) {
          req.body.image = req.file.filename
        }
        let data = new Recipe(req.body)
        await data.save()
        await data.populate(["createdBy", "categoryId"]);
        if (data.image) {data.image = `${req.protocol}://${req.get("host")}/uploads/recipes/${data.image}`}
        
        res.status(201).json({message:"added successfully" , data})

})

////////////////////////////////
const getAllRecipe =catchError( async(req,res,next) =>{
        ///pagination
        let pageNumber = req.query.page *1 || 1
        if(pageNumber <1) pageNumber = 1 
        let limit = req.query.limit *1 || 1
        let skip = (pageNumber -1) * limit

        //filteration 
        let filter = req.query
        console.log(filter)
        
        if(req.query.search){
                filter.title = {$regex:req.query.search,$options:"i"}
        }

        let data = await Recipe.find(filter).skip(skip).limit(limit)
             .populate("categoryId")
             .populate("createdBy")
        let totalRecipe = await Recipe.countDocuments(filter)
        data = data.map(recipe => {
            const obj = recipe.toObject();
             if(obj.image){ obj.image =`${req.protocol}://${req.get("host")}/uploads/recipes/${obj.image}`}
             return obj;
             })
        res.status(200).json({message:"success",
                metaData:{
                        currentPage: pageNumber,
                        totalPages:Math.ceil(totalRecipe/limit),
                        totalResults:totalRecipe
                }  , data})

})

////////////////////////////////
const getOneRecipe =catchError( async(req,res,next) =>{

        let {id} = req.params
        let data = await Recipe.findById(id)
        if(!data){return next(new AppError("Recipe not found",404))}
        if (data.image) {data.image = `${req.protocol}://${req.get("host")}/uploads/recipes/${data.image}`}
        return res.status(200).json({message: "Recipe updated successfully",data});
})

////////////////////////////////
const updateRecipe = catchError( async(req,res,next) =>{
        let {id} = req.params
        const updateData = {}
        if(req.body.title){updateData.title = req.body.title}
        if(req.body.description){updateData.description = req.body.description}     // هنا انا بحدد اي الحاجات اللي اقدر اعدلها 
        if(req.file){updateData.image = req.file.filename}
        
        let data = await Recipe.findByIdAndUpdate(id,updateData,{new:true})
        if(!data){return next(new AppError("Recipe not found",404))}
        if (data.image) {data.image = `${req.protocol}://${req.get("host")}/uploads/recipes/${data.image}`}
        return res.status(200).json({message: "Recipe updated successfully",data});
       
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