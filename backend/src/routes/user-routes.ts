import { Router } from "express";
import { getAllUsers, userSignUp } from "../controllers/user-controllers.js";


const userRoutes=Router();
userRoutes.get("/",getAllUsers)
userRoutes.post("/signUp",userSignUp)
export default userRoutes;