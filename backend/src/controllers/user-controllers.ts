import User from "../models/User.js"

import{NextFunction,Request,Response} from 'express'
import {compare, hash} from 'bcrypt'
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";


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
        
          // clear old cookie
          res.clearCookie(COOKIE_NAME,
            {
                path:"/",
                httpOnly:true,
                domain:process.env.DOMNAIN,signed:true

            }
        );
        
        // create token and store cookie 
        const token=createToken(user._id.toString(),user.email,"7d")
            const expires=new Date();
            expires.setDate(expires.getDate()+7)
            res.cookie(COOKIE_NAME,token,{path:"/",domain:process.env.DOMNAIN,expires,httpOnly:true,signed:true,secure:true,sameSite:'none'})

        return res.status(201).json({message:"OK",name:user.name,email:user.email})
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
       
            // clear old cookie
            res.clearCookie(COOKIE_NAME,
                {
                    path:"/",
                    httpOnly:true,
                    domain:process.env.DOMNAIN,signed:true

                }
            );

            const token=createToken(user._id.toString(),user.email,"7d")
            const expires=new Date();
            expires.setDate(expires.getDate()+7)
            res.cookie(COOKIE_NAME,token,{path:"/",domain:process.env.DOMAIN,expires,httpOnly:true,signed:true,secure:true,sameSite:'none'})


        return res.status(200).json({message:"OK",name:user.name,email:user.email})
    }catch(error){ 
        
         return res.status(500).json({message:"ERROR",cause:error.message})
    }
}



export const verifyUser=async (
    req:Request,res:Response,next:NextFunction)=>{
   
    try{
       
       
    
        const user=await User.findById({email:res.locals.jwtData.id})
        if(!user)
            return res.status(401).send("User not registered or token malfunctioned.");

        if(user._id.toString()!==res.locals.jwtData.id)
            return res.status(401).send("Permission did not match.");


        return res.status(200).json({message:"OK",name:user.name,email:user.email})
    }catch(error){
        
         return res.status(200).json({message:"ERROR",cause:error.message})
    }
}


export const logoutUser=async (
    
    req:Request,res:Response,next:NextFunction)=>{
   
    try{
        console.log("logging out")
       
    

  // clear old cookie
  res.clearCookie(COOKIE_NAME,
    {
        path:"/",
        httpOnly:true,
        domain:process.env.DOMNAIN,
        signed:true

    })
console.log("cookie cleared.")
return res.status(200).json({message:"OK"});
    }catch(error){
        console.log("error")
         return res.status(200).json({message:"ERROR",cause:error.message})
    }
}