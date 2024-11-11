import User from "../models/User.js"

import{NextFunction,Request,Response} from 'express'
import {compare, hash} from 'bcrypt'


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
        const existing=await User.findOne({email:email});
        if(existing)return res.status(401).send("Use already registered.")
        const hashedPassword=await  hash(password,10);
        console.log(hashedPassword);
    const user=  new User({name,email,password:hashedPassword});
        await user.save();
        
        return res.status(201).json({message:"OK",id:user._id.toString()})
    }catch(error){
        
         return res.status(200).json({message:"ERROR",cause:error.message})
    }
}


export const userLogin=async (req:Request,res:Response,next:NextFunction)=>{
    // get all users
    try{
        const {email,password}=req.body;
        // first is passowrd and second is encryption round
       
    
        const user=await User.findOne({email:email})
        if(!user)return res.status(401).send("User not registered.");
        // now verify password
        const isPasswordCorrect=await compare(password,user.password);
        if(!isPasswordCorrect)return res.status(403).send("Incorrect Password .")

        return res.status(200).json({message:"OK",id:user._id.toString()})
    }catch(error){
        
         return res.status(200).json({message:"ERROR",cause:error.message})
    }
}