import { Router } from "express";
import { getAllUsers, userLogin, userSignUp } from "../controllers/user-controllers.js";
import { validate, signUpValidator, loginValidator } from '../utils/validators.js';
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signUp", validate(signUpValidator), userSignUp);
userRoutes.post("/login", validate(loginValidator), userLogin);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map