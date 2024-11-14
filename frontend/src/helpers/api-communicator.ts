import axios from "axios"

export const loginUser=async(email:string,password:string)=>{
    const res= await axios.post("/users/login",{email,password});
    // console.log(res)
    if(res.status!=200){
        throw new Error("Unable to login.")
    }
    const data=await res.data;
    return data;
}


export const checkAuthStatus=async()=>{
    const res= await axios.get("/users/auth-status");
    // console.log(res)
    if(res.status!=200){
        throw new Error("Unable to authenticate.")
    }
    const data=await res.data;
    return data;
}

// get all the chats
export const getChats=async()=>{
    const res=await axios.get('/chat/');
    if(res.status!=200)
        throw new Error("Unable to get data.")
    const data=await res.data;
    return data;
}


export const sendChatRequest=async(message:string)=>{
    const res= await axios.post("/chat/new",{message});
    // console.log(res)
    if(res.status!=200){
        throw new Error("Unable to send chat.")
    }
    const data=await res.data;
    return data;
}