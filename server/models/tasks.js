import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    priority : {
        type : String,
        enum : ["Low","Medium" ,"High" ]
    },
    status : {
        type : String,
        enum : ["Todo", "In Progress", "Completed"]
    },
    dueDate : Date,
    
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
},{timestamps : true})

const Task=mongoose.model("Task",taskSchema)

export default Task