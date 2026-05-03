import { User } from "../../../db/models/user.model.js"



/////////////////////////////////////////
const addUser =async(req,res)=>{
    try {
        let data = new User(req.body)
        await data.save()
        // data.password = undefined
        // let data = await User.insertMany(req.body)
        res.status(201).json({message:"success" , data})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//////////////////////////////////////////////
const getAllUsers = async (req, res) => {
  try {
    let data = await User.find()
    res.status(200).json({ message: "success", data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


//////////////////////////////////////////////
const getOneUser = async (req, res) => {
  try {
    let {id} = req.params
    console.log(req.params.id)
    let data = await User.findById(id)
    res.status(200).json({ message: "success", data })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/////////////////////////////////////////////////////
const updateUser = async(req,res)=>{
    try {
        let {id} = req.params
        // let data = await User.findByIdAndUpdate(id,req.body,{new:true})
        // let data = await User.findOneAndUpdate({email:req.body.email},req.body,{new:true})
        let data = await User.updateMany({name:req.body.name},req.body)
        res.status(200).json({ message: "success", data })
        
    } catch (error) {
        res.status(500).json({ message: error.message })
        
    }
}

///////////////////////////
const deleteUser = async(req,res)=>{
    try {
        let {id} = req.params
        let data = await User.findByIdAndDelete(id)
        res.status(200).json({ message: "the item is deleted successfully", data })
        
    } catch (error) {
        res.status(500).json({ message: error.message })
        
    }
}

export{
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
}
