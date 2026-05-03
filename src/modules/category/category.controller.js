import { Category } from "../../../db/models/category.model.js"

const addCategory =async(req,res)=>{
    try {
        // let data = new Category.insertMany(req.body)
        let data = new Category(req.body)
        await data.save()
        res.status(201).json({message:"category created successfully" , data})
        console.log("DB URI:", process.env.DB_URI)

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
        console.log("DB URI:", process.env.DB_URI)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/////////////////////////////////
const getOneCategory = async(req,res)=>{
    try {
        let {id} =req.params
        let data = await Category.findById(id)
        res.status(201).json({message:"get one category" , data})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

/////////////////////////////////
const updateCategory = async(req,res)=>{
    try {
        let {id} =req.params
        let data = await Category.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json({message:"updated successfully" , data})

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

////////////////////////////////
const deleteCategory = async(req,res)=>{
    try {
        let {id} =req.params
        let data = await Category.findByIdAndDelete(id)
        res.status(200).json({ message: "the item is deleted successfully", data })

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