const {app} = require("./src/app.js");
require("dotenv").config()
const connectDB=require("./src/config/db");
const invokeGeminiAi=require("./src/services/ai.service.js");
connectDB();
invokeGeminiAi()

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})