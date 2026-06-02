process.on("uncaughtException",(err)=>{
    console.log("err",err);
    
})

import express from "express";
import { dbconnect } from "./db/dbconnection.js";
import dotenv from "dotenv"
import { userRouter } from "./src/modules/user/user.routes.js";
import { categoryRouter } from "./src/modules/category/category.routes.js";
import { recipeRouter } from "./src/modules/recipe/recipe.routes.js";
import { favRecipeRouter } from "./src/modules/favorite/favorite.routes.js";
import { authRouter } from "./src/modules/Auth/auth.routes.js";
import { AppError } from "./src/utils/AppError.js";
import { globalError } from "./src/middlware/globalError.js";


dotenv.config()

await dbconnect()
const app = express() 
const port = process.env.PORT || 3000
app.use(express.json())                          // convert body from json to object to be save without it return undefing
app.use("/uploads", express.static("uploads"))   // to show files and images on browser "in end points"




app.use("/auth",authRouter)
app.use("/users",userRouter)
app.use("/category",categoryRouter)
app.use("/recipe",recipeRouter)
app.use("/favorite",favRecipeRouter)

app.get('/', (req, res) => res.send('Hello World!'))

app.use((req,res,next)=>{
    next(new AppError(`404 not found page ${req.originalUrl}`,404))
})

app.use(globalError)
process.on("unhandledRejection",(err)=>{
    console.log("error DB");
    
})


export default app;