import mongoose, { Schema, model } from "mongoose"

const favSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true,
    },
    recipeId:{
        type:mongoose.Types.ObjectId,
        ref:"recipe",
        required:true,
    },
   
}, {timestamps: true})

export const Favorite = model("favorite", favSchema)