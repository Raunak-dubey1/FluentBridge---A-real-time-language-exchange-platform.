import mongoose from "mongoose"
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
  fullName:{
    type:String,
    require:true
  },
  email:{
    require:true,
    unique:true,
    type:String
  },
  password:{
    require:true,
    type:String,
    minlength:8
  },
  bio:{
    type:String,
    default:""
  },
  profilePic:{
    type:String,
    default:""
  },
  nativeLanguage:{
    require:true,
    type:String,
  },
  learningLanguage:{
    require:true,
    type:String,
  },
  profilePic:{
    type:String,
    default:""
  },
  location:{
    require:true,
    type:String,
  },
  isOnboarded:{
    type:Boolean,
    default:false
  },
  friends:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
  ]
},{timestamps:true})

//hashing the password using pre hook

userSchema.pre("save",async function(next){
     
    if(!this.isModified("password")) return next();

    try{
      const salt=await bcrypt.genSalt(10);
      this.password=await bcrypt.hash(this.password,salt)

      next();
    }catch(error){
    console.log(error);
    }
})

userSchema.methods.checkPassword=async function(enteredPassword){
  const isCorrect=await bcrypt.compare(enteredPassword,this.password);
  return isCorrect
}

export const User= mongoose.model("User",userSchema)