import express from 'express'
import {config} from 'dotenv'
import mogran from 'morgan'
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
config();
// app holds the functionality of express
const app=express();
// middlewwares
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
// remove it in production
// gives you log description of api calls
app.use(mogran("dev"))

app.use("/api/v1",appRouter);
export default app;
