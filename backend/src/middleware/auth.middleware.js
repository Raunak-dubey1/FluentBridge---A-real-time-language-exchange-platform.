import jwt from "jsonwebtoken";
import {User} from "../models/User.js"

/* middleware  to veirfy that the user 
going for onboard should be verified first*/

export const protectRoute=async(req,res,next)=>{
    try{
        const token =req.cookies.jwt;

        if(!token){
            return res.status(401).json({message:"Unauthorized-No token provided"})
        }
            
        const decoded= jwt.verify(token ,process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({message:"Invalid Token"})
        }
        // console.log(decoded);
        const user = await User.findById(decoded.userId).select("-password");

        // console.log(user);

        if(!user){
            return res.status(401).json({message:"User does not Exist"})
        }

        req.user=user; // adding user to the req
        next();
    }catch(error){
        console.log("Error in protectRoute middleware",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}  