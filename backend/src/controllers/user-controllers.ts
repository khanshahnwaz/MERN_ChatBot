import User from "../models/User.js"

import{NextFunction,Request,Response} from 'express'
import {hash} from 'bcrypt'


export const getAllUsers=async (req:Request,res:Response,next:NextFunction)=>{
    // get all users
    try{
        const users=await User.find();
        return res.status(200).json({message:"OK",users})
    }catch(error){
        console.log(error)
         return res.status(200).json({message:"ERROR",cause:error.message})
    }
}

export const userSignUp=async (req:Request,res:Response,next:NextFunction)=>{
    // get all users
    try{
        const {name,email,password}=req.body;
        // first is passowrd and second is encryption round
        const hashedPassword=await  hash(password,10);
        console.log(hashedPassword);
    const user=  new User({name,email,password:hashedPassword});
        await user.save();
        
        return res.status(200).json({message:"OK",id:user._id.toString()})
    }catch(error){
        
         return res.status(200).json({message:"ERROR",cause:error.message})
    }
}