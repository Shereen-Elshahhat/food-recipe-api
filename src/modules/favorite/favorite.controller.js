import { Favorite } from "../../../db/models/favorite.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchError } from './../../middlware/catchError.js';
import jwt from 'jsonwebtoken'

const addFavRecipe = catchError(async(req,res)=>{
        req.body.userId = req.user.id
        let data = new Favorite(req.body)
        await data.save()
        await data.populate(["userId", "recipeId"]);
        res.status(201).json({message:"favorite recipe added successfully" , data})
   
})

/////////////////////////////////////
const getAllFavRecipe = catchError(async(req,res)=>{
                let data = await Favorite.find({userId:req.user.id}).populate("userId").populate("recipeId")
                res.status(200).json({message:"get fav successfully" , data})
})


////////////////////////////////
const getOnefav = catchError(async(req,res) =>{

        let {id} = req.params
        let data = await Favorite.findById(id)
        if(data){return res.status(200).json({message:"success" , data})}
        res.status(404).json({message:"fav recipe not found"})
})

////////////////////////////////

const removeFromFav =catchError( async(req,res) =>{

        let {id} = req.params
        let data = await Favorite.findByIdAndDelete(id)
        if(data){return res.status(200).json({message:"deleted successfully" , data})}
        res.status(404).json({message:"fav recipe not found"})
})

export{
    addFavRecipe,
    getAllFavRecipe,
    getOnefav,
    removeFromFav
}