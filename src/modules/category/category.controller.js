import { Category } from "../../../db/models/category.model.js"

const addCategory =async(req,res)=>{
    try {
        // let data = new Category.insertMany(req.body)
        let data = new Category(req.body)
        await data.save()
        res.status(201).json({message:"category created successfully" , data})

        console.log("POST working")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

////////////////////////////////
const getAllCategory = async(req,res)=>{
    try {
        let data = await Category.find()
        res.status(200).json({message:"All Categories" , data})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/////////////////////////////////
const getOneCategory = async(req,res)=>{
    try {
        let {id} =req.params
        let data = await Category.findById(id)
        if(data){ return res.status(200).json({message:"get one category" , data})}
        res.status(404).json({message:"category not found"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/////////////////////////////////
const updateCategory = async(req,res)=>{
    try {
        let {id} =req.params
        let data = await Category.findByIdAndUpdate(id,req.body,{new:true})
        if(data){ return res.status(200).json({message:"updated successfully" , data})}
        res.status(404).json({message:"category not found"})
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

////////////////////////////////
const deleteCategory = async(req,res)=>{
    try {
        let {id} =req.params
        let data = await Category.findByIdAndDelete(id)
        if(data){return res.status(200).json({ message: "the item is deleted successfully", data })}
        res.status(404).json({message:"category not found"})
    
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export{
    addCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
    deleteCategory
}