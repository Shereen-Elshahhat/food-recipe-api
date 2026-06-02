import { Schema, model } from "mongoose"
import  bcrypt  from 'bcrypt';

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    age:{
        type:Number,
        default:18,
    },
    password:{
        type:String,
        required:true,
        minlength:9,
        select:false,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    // city:{
    //     type:String,
    //     required:true,
    // },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
   status: {
     type: String,
     enum: ["active", "inactive"],
     default: "active"
   },
   otp:{
    type:String,
   },
   optExpires:Date,
   passwordChangeAt:Date,
   isOTPVerified:{
     type:Boolean,
     default:false
   }
}, {timestamps: true})

userSchema.index({email:1}) /////=== unique
userSchema.set("toJSON",{
    transform:(doc,ret)=>{
        console.log(doc)
        // delete ret.password
        delete ret.__v 
    }
})

userSchema.pre("save",async function(){
      if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password,8)
})

export const User = model("user", userSchema)