import mongoose, { Schema, model } from "mongoose"

const recipeSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    createdBy:{
        // type:mongoose.Types.ObjectId,
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        // type:mongoose.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image: {
        type: [String],
        required: false
    },
    ingredients:[{
        type:String,
        required:true,
    }],
    steps:[{
        type:String,
        required:true,
    }],
    
}, {timestamps: true})

recipeSchema.post("init",(doc)=>{
    doc.image = doc.image = process.env.Base_Url + doc.image
})

export const Recipe = model("recipe", recipeSchema)