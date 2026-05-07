import { Favorite } from "../../../db/models/favorite.model.js";

const addFavRecipe = async(req,res)=>{
    try {
        let data = new Favorite(req.body)
        await data.save()
        await data.populate(["userId", "recipeId"]);
        res.status(201).json({message:"favorite recipe added successfully" , data})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/////////////////////////////////////
const getAllFavRecipe = async(req,res)=>{
    try {
        let data = await Favorite.find().populate("userId").populate("recipeId")
        res.status(200).json({message:"get fav successfully" , data})
  
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


////////////////////////////////
const getOnefav = async(req,res) =>{
    try {
        let {id} = req.params
        let data = await Favorite.findById(id)
        if(data){return res.status(200).json({message:"success" , data})}
        res.status(404).json({message:"fav recipe not found"})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

////////////////////////////////
// const updateFav = async(req,res) =>{
//     try {
//         let {id} = req.params
//         let data = await Favorite.findByIdAndUpdate(id,req.body,{new:true})
//         res.status(200).json({message:"updated successfully" , data})

//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }

////////////////////////////////
const removeFromFav = async(req,res) =>{
    try {
        let {id} = req.params
        let data = await Favorite.findByIdAndDelete(id)
        if(data){return res.status(200).json({message:"deleted successfully" , data})}
        res.status(404).json({message:"fav recipe not found"})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export{
    addFavRecipe,
    getAllFavRecipe,
    getOnefav,
    removeFromFav
}