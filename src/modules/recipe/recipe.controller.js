import { Recipe } from "../../../db/models/recipe.model.js"

const addRecipe =async(req,res) =>{
    try {
        let data = new Recipe(req.body)
        await data.save()
        await data.populate(["userId", "categoryId"]);
        res.status(201).json({message:"added successfully" , data})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

////////////////////////////////
const getAllRecipe = async(req,res) =>{
    try {
        let data = await Recipe.find().populate("categoryId").populate("userId")
        res.status(200).json({message:"success" , data})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

////////////////////////////////
const getOneRecipe = async(req,res) =>{
    try {
        let {id} = req.params
        let data = await Recipe.findById(id)
        res.status(200).json({message:"success" , data})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

////////////////////////////////
const updateRecipe = async(req,res) =>{
    try {
        let {id} = req.params
        let data = await Recipe.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({message:"updated successfully" , data})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

////////////////////////////////
const deleteRecipe = async(req,res) =>{
    try {
        let {id} = req.params
        let data = await Recipe.findByIdAndDelete(id)
        res.status(200).json({message:"deleted successfully" , data})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export{
    addRecipe,
    getAllRecipe,
    getOneRecipe,
    updateRecipe,
    deleteRecipe
}