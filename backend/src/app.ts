import express from 'express'
import {config} from 'dotenv'
import mogran from 'morgan'
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
config();
// app holds the functionality of express
const app=express();
// middlewwares
// allow our frontend server to make request on our server
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = ['https://mern-chat-bot-six.vercel.app', 'http://localhost:5173']; // Add frontend URLs
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.options('*', cors(corsOptions));  // Handle preflight requests globally

app.use(cors(corsOptions));app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
// remove it in production
// gives you log description of api calls
// app.use(mogran("dev"))
app.get("/",(req,res)=>res.send("Hello I am working fine"))
app.use("/api/v1",appRouter);
export default app;
