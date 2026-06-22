const express=require("express");
const authRoutes=require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const cors=require("cors");

const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
// required all the routes here
app.use("/api/auth",authRoutes)
module.exports={app};