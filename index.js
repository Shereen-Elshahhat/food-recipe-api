import express from "express";
import { dbconnect } from "./db/dbconnection.js";
import dotenv from "dotenv"
import { userRouter } from "./src/modules/user/user.routes.js";
import { categoryRouter } from "./src/modules/category/category.routes.js";
import { recipeRouter } from "./src/modules/recipe/recipe.routes.js";
import { favRecipeRouter } from "./src/modules/favorite/favorite.routes.js";

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

dbconnect()

app.use("/users",userRouter)
app.use("/category",categoryRouter)
app.use("/recipe",recipeRouter)
app.use("/favorite",favRecipeRouter)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))