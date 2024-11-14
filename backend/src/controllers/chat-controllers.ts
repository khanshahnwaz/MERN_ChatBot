import { NextFunction,Request,Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { model } from "mongoose";


// return chats of the user 
export const getChats=async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    try{

    
    const user=await User.findById(res.locals.jwtData.id);
    if(!user)
        return res.status(401).json({message:"User not registered or token malfunctioned"})
//  grab chats of user

const chats=user.chats.map(({role,content})=>({ role,content  })) as ChatCompletionRequestMessage[];

return res.status(200).json({chats:user.chats});
    }catch(error){
        return res.status(500).json({message:"Server error."})
    }

}

export const generateChatCompletion=async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const {message}=req.body;
    console.log("Message",message)
    try{

    
    const user=await User.findById(res.locals.jwtData.id);
    if(!user)
        return res.status(401).json({message:"User not registered or token malfunctioned"})
//  grab chats of user

const chats=user.chats.map(({role,content})=>({ role,content  })) as ChatCompletionRequestMessage[];

chats.push({content:message,role:"user"});

user.chats.push({content:message,role:'user'})

// send all chats with new one to openAI API

const config= configureOpenAI();
// console.log("first")
const openAI=new OpenAIApi(config);
// console.log("second")
// gemini
const gen=new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model=gen.getGenerativeModel({
    model:"gemini-1.5-pro"
});
const chatResponse=await model.generateContent(message);
console.log(chatResponse.response.text())
// const chatResponse= await openAI.createChatCompletion({model:'gpt-3.5-turbo',
//     messages:chats,
// });
// console.log("third")
// get latest response 
user.chats.push({content:chatResponse.response.text(),role:'assistant'});
// console.log("four")

await user.save();      

return res.status(200).json({chats:user.chats});
    }catch(error){
        // console.log(error);
        return res.status(500).json({message:"Something went wrong."})
    }

}