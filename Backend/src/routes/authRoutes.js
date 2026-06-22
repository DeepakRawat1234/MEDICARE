const express=require("express");
const router=express.Router();
const {registerUser,loginUser,logoutUser,getMeController}=require("../controller/authController");
const authMiddleware =require("../middleware/auth.middleware.js")
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register",registerUser);
/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
router.post("/login",loginUser)
module.exports=router;

/**
 * @route GET /api/auth/logout
 * @desc CLear the token cookie to log out the user
 * @access Public
 */
router.get("/logout",logoutUser)

/**
 * @route GET /api/auth/get-me
 * @desc Get the authenticated user's information
 * @access Private
 */
router.get("/get-me",authMiddleware.authUser,getMeController);