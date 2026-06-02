import { Favorite } from "../../../db/models/favorite.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from './../../middlware/catchError.js';


const addFavRecipe = catchError(async(req,res,next)=>{
        const {recipeId} = req.body
        let isExist = await Favorite.findOne({recipeId , userId:req.user.id})
        if(isExist) return next(new AppError("you already add this recipe to your favorite",400))
        req.body.userId = req.user.id
        let data = new Favorite(req.body)
        await data.save()
        await data.populate(["recipeId"]);
        res.status(201).json({message:"favorite recipe added successfully" , data})
   
})

/////////////////////////////////////
const getAllFavRecipe = catchError(async(req,res,next)=>{
                let data = await Favorite.find({userId:req.user.id}).populate("userId").populate("recipeId")
                res.status(200).json({message:"get fav successfully" , data})
})


////////////////////////////////
const getOnefav = catchError(async(req,res,next) =>{

        let {id} = req.params
        let data = await Favorite.findById(id)
        if(data){return res.status(200).json({message:"success" , data})}
        res.status(404).json({message:"fav recipe not found"})
})

////////////////////////////////

const removeFromFav =catchError( async(req,res,next) =>{

        let {id} = req.params
        let data = await Favorite.findOneAndDelete({
                recipeId:id,        //دا عشان اليوزر اللس ضاف الفيف دي هو بس الي يمسحها 
                userId:req.user.id
        })
        if(data){return res.status(200).json({message:"deleted successfully" , data})}
        res.status(404).json({message:"fav recipe not found"})
})

export{
    addFavRecipe,
    getAllFavRecipe,
    getOnefav,
    removeFromFav
}