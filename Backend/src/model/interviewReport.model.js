const mongoose=require('mongoose');

const technicalQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention behind technical question is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer to technical question is required"]
    }
},{
    _id:false
})

const behavioralQuestionSchema=new mongoose.Schema({
    question:{
        type:String,
        required:[true,"Behavioral question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention behind behavioral question is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer to behavioral question is required"]     
    }
},{
    _id:false
})

const skillGapSchema=new mongoose.Schema({
    skill:{
        type:String,
        required:[true,"Skill gap is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required:[true,"Severity of skill gap is required"]
    }
},{
    _id:false
})

const preparationPlanSchema=new mongoose.Schema({
    day:{
        type:Number,
        required:[true,"Day number in preparation plan is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus of the day in preparation plan is required"]
    },
    tasks:[{
        type:String,
        required:[true,"Tasks for the day in preparation plan are required"]
    }]
},{
    _id:false
})

const interviewReportSchema=new mongoose.Schema({
    jobDescription:{
        type:String,
        required:[true,"Job description is required"]
    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    },
    technicalQuestions:[technicalQuestionSchema],
    behavioralQuestions:[behavioralQuestionSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema]
},{
    timestamps:true
})
const InterviewReportModel=mongoose.model("InterviewReport",interviewReportSchema);
module.exports=InterviewReportModel;