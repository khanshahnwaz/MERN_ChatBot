import express from 'express'
// app holds the functionality of express
const app=express();
// middlewwares
app.use(express.json())


// connections and listeners
app.listen(5000,()=>console.log("Server running 5000"))

