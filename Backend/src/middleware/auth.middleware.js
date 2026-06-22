const jwt = require("jsonwebtoken");
const BlacklistModel=require("../model/blacklist.model")
const authUser=async(req,res,next)=>{
    const token=req.cookies.token;
    const isBlacklisted=await BlacklistModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({
            message:"Token is invalid"
        })
    }
    if(!token){
        return res.status(401).json({
            message:"Unauthorized, no token provided"
        })
    }
    try{
        const decoded= jwt.verify(token,process.env.JWT_KEY);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(401).json({
            message:"Unauthorized, invalid token"
        })
    }
   
}
module.exports={authUser};