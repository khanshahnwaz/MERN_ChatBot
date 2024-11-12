import { ReactNode, useContext, useEffect } from 'react';
import {createContext, useState} from 'react'
type User={
    name:string,
    email:string,
}
type UserAuth={
    isLoggedIn:boolean,
    user:User | null;
    login:(email:string,password:string)=>Promise<void>;
   signUp:(name:string,email:string,password:string)=>Promise<void>;
   logout:()=>Promise<void>

}
const AuthContext=createContext<UserAuth|null>(null);
export const AuthProvider=({children}:{children:ReactNode})=>{
    const [user,setUser]=useState<User|null>(null);
    const[isLoggedIn,setIsLoggedIn]=useState(false);

// fetch if the users cookie are valid then skip login
    useEffect(()=>{},[]);

    const login=async(email:string,password:string)=>{};
    const signUp=async(name:string,email:string,password:string)=>{};
    const logout=async()=>{};


    const value={
        user,
        isLoggedIn,
        login,
        logout,
        signUp,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


export const useAuth=()=>useContext(AuthContext);