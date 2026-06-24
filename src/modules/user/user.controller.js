import { User } from "../../../db/models/user.model.js"
import { catchError } from "../../middlware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { Category } from './../../../db/models/category.model.js';
import { Recipe } from './../../../db/models/recipe.model.js';



/////////////////////////////////////////
const addUser =catchError( async(req,res)=>{

        let data = new User(req.body)
        await data.save()
        // data.password = undefined
        // let data = await User.insertMany(req.body)
        res.status(201).json({message:"success" , data})
})

//////////////////////////////////////////////
const getAllUsers =catchError( async (req, res) => {

    let data = await User.find()
    res.status(200).json({ message: "success", data })
})


//////////////////////////////////////////////
const getOneUser =catchError( async (req, res, next) => {

    let {id} = req.params
    console.log(req.params.id)
    let data = await User.findById(id)
    if(data){ return res.status(200).json({ message: "success",data})}  //handle id is exist or not
    next(new AppError("User not found",404))
})

/////////////////////////////////////////////////////
const updateUser = catchError(async(req,res,next)=>{
    if ( req.user.role !== "admin" && req.user.id !== req.params.id){
         return next(new AppError("Forbidden", 403));
    }

        let {id} = req.params
        let data = await User.findByIdAndUpdate(id,req.body,{new:true})
        // let data = await User.findOneAndUpdate({email:req.body.email},req.body,{new:true})
        // let data = await User.updateMany({name:req.body.name},req.body)
        if(data){ return res.status(200).json({ message: "updated successfully"})}  //handle id is exist or not
        next(new AppError("User not found",404))
       
})

///////////////////////////
const deleteUser =catchError(async(req,res,next)=>{

        let {id} = req.params
        let data = await User.findByIdAndDelete(id)
        if(data){ return res.status(200).json({ message: "this item deleted successfully",data })}  //handle id is exist or not
        next(new AppError("User not found",404))
})

const getDashboard = catchError(async(req,res)=>{
    const [userCount , recipeCount, categoryCount] = await Promise.all([
        User.countDocuments(),
        Recipe.countDocuments(),
        Category.countDocuments(),
    ])
    res.status(200).json({
        mwssage:"success",
        data:{
            totalUsers:userCount,
            totalRecipe:recipeCount,
            totalCategories:categoryCount
        }
    })

})

export{
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    getDashboard
}
