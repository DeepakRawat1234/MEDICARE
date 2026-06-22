const userModel=require("../model/userModel");
const BlacklistModel=require("../model/blacklist.model")
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
require("dotenv").config()


 /**
  * @name registerUser
  * @description This function registers a new user in the database.
  * @route POST /api/auth/register
  */
const registerUser=async(req,res)=>{
const {username,email,password}=req.body;
if(!username || !email || !password){
   return res.status(400).json("All fields are required!")
}
const findUser=await userModel.findOne({
    $or:[{username},{email}]
})
if(findUser){
return res.status(400).json("User Already Exists");
}
const hash= await bcrypt.hash(password,10);
const user=await userModel.create({
username,
email,
password:hash
})
const token=jwt.sign(
    {id:user._id, username:user.username},
    process.env.JWT_KEY,
    {expiresIn:"1d"}
    
)

res.cookie("token",token);
res.status(201).json({
    message:"User Registred Successfully",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
})
}

 /**
  * @name loginUser
  * @description This function login a  user in the database.
  * @route POST /api/auth/login
  */
 const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    const user= await userModel.findOne({email})
    if (!user){
        return res.status(400).json({message:"Invalid email or password"})
    }
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid password"
        })
    }
    const token=jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_KEY,
        {expiresIn:"1d"}
    )
    res.cookie("token",token);
    res.status(201).json(
        {message:"User loggedIn successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
 })
 }

 /**
  * @name logoutUser
  * @description This function logout a user by clearing the token cookie.
  * @route GET /api/auth/logout
  */
 const logoutUser=async(req,res)=>{
    const token= req.cookies.token;
    
    
    if(token){
       const data= await BlacklistModel.create({token});
      
    }
   
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out successfully"
    })
 }

 /**
  * @name getMeController
  * @desc Get the authenticated user's information
  * @access Private
  */
 const getMeController=async(req,res)=>{
    const user= await userModel.findById(req.user.id);
    
    res.status(200).json({
        message:"User information retrieved successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
 }
module.exports={registerUser,loginUser,logoutUser,getMeController}