import { Recipe } from "../../../db/models/recipe.model.js"
import fs from "fs"
import path from "path"

const addRecipe =async(req,res) =>{
    try {
        if (req.file) {
          req.body.image = req.file.filename
        }
        let data = new Recipe(req.body)
        await data.save()
        await data.populate(["userId", "categoryId"]);
        if (data.image) {data.image = `/uploads/recipes/${data.image}`}
        
        res.status(201).json({message:"added successfully" , data})
        

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

////////////////////////////////
const getAllRecipe = async(req,res) =>{
    try {
        let data = await Recipe.find().populate("categoryId").populate("userId")
        data.forEach((recipe)=>{
           if(recipe.image){ recipe.image = `/uploads/recipes/${recipe.image}`}    ///use mapping because getall function return array not object
        })
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
        if (data.image) {data.image = `/uploads/recipes/${data.image}`}
        if(data){return res.status(200).json({message:"success" , data})}
        res.status(404).json({message:"recipe not found"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

////////////////////////////////
const updateRecipe = async(req,res) =>{
    try {
        let {id} = req.params
        if (req.file) {
          req.body.image = req.file.filename

        }
        let data = await Recipe.findByIdAndUpdate(id,req.body,{new:true})
        if (data.image) {data.image = `/uploads/recipes/${data.image}`}
        if(data){ return res.status(200).json({message:"updated successfully" , data})}
        res.status(404).json({message:"recipe not found"})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

////////////////////////////////
const deleteRecipe = async(req,res) =>{
    try {
        let {id} = req.params
        let data = await Recipe.findByIdAndDelete(id)
        if(data){return res.status(200).json({message:"deleted successfully" , data})}
        res.status(404).json({message:"recipe not found"})

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