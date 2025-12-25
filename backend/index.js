import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

dotenv.config() // ye line .env file k ander jo bhi variable hai usko read krne k liye hoti hai

const app=express()  // express k andar jitni bhi function h usko ham app k thru call kr sakte hai 
const port=process.env.PORT || 5000  // agar .env file me PORT variable define nahi hai to ye default 3000 pe chalega

// app.get("/",(req,res)=>{
//     res.send("Hello from backend!!") // ye contoller wala part hai to usme likhege 
    

// })
app.use(express.json()) // ye line body me json data ko read krne k liye hoti hai
app.use(cookieParser()) // ye line cookies ko read krne k liye hoti hai
app.use("/api/auth",authRouter)

app.listen(port,()=>{
    connectDb()
    console.log(`Server is running on port ${port}`);
})