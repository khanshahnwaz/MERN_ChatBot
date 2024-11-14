import {Router} from 'express'
import userRoutes from './user-routes.js';
import chatRoutes from './chat-routes.js';
const appRouter=Router();

appRouter.use("/users",userRoutes)// handles /domain/api/v1/user
appRouter.use("/chat",chatRoutes)// domain.api/v1/chats
export default appRouter;