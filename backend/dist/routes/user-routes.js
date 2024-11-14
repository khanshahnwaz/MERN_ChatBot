import { Router } from "express";
import { getAllUsers, logoutUser, userLogin, userSignUp, verifyUser } from "../controllers/user-controllers.js";
import { validate, signUpValidator, loginValidator } from '../utils/validators.js';
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signUp", validate(signUpValidator), userSignUp);
userRoutes.post("/login", validate(loginValidator), userLogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get('/logout', verifyToken, logoutUser);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map