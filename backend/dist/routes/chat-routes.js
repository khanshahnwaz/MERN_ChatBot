import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, getChats } from "../controllers/chat-controllers.js";
// Protected API
const chatRoutes = Router();
chatRoutes.post('/new', validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get('/', verifyToken, getChats);
chatRoutes.delete('/deleteChats', verifyToken, deleteChats);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map