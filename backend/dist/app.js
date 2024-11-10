import express from 'express';
import { config } from 'dotenv';
import mogran from 'morgan';
import appRouter from './routes/index.js';
config();
// app holds the functionality of express
const app = express();
// middlewwares
app.use(express.json());
// remove it in production
// gives you log description of api calls
app.use(mogran("dev"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map