const UsersModel= require("../models/Users.js");

module.exports.getTasksController= async(req,res)=>{
    //Req.body should have emailId
    try{
        const userData= await UsersModel.findOne({emailId:req.body.emailId});
        return res.status(200).json({tasksList: userData.tasksList});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Unable to Fetch Tasks"});
    }
}

module.exports.addTaskController= async(req,res)=>{
    try{
        //Req.body should have emailId and taskText
        const userData= await UsersModel.findOne({emailId:req.body.emailId});
        const taskData={
            text:req.body.taskText,
            isCompleted:false,
        }
        userData.tasksList.push(taskData);
        await userData.save();
        return res.status(200).json({message:"Task Added Successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Unable to Add Task"});
    }
}

module.exports.editTaskController= async(req,res)=>{
    try{
        //Req.body should have emailId, taskIdx and taskText
        const userData= await UsersModel.findOne({emailId:req.body.emailId});

        userData.tasksList[req.body.taskIdx].text=req.body.taskText;
        userData.markModified("tasksList");

        await userData.save();

        return res.status(200).json({message:"Task Edited Successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Unable to Edit Task"});
    }
}

module.exports.deleteTaskController= async(req,res)=>{
    try{
        //Req.body should have emailId and taskIdx
        const userData= await UsersModel.findOne({emailId:req.body.emailId});

        userData.tasksList.splice(req.body.taskIdx,1);
        userData.markModified("tasksList");

        await userData.save();

        return res.status(200).json({message:"Task Deleted Successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Unable to Delete Task"});
    }
}

module.exports.clearCompletedController= async(req,res)=>{
    try{
        //Req.body requires emailId
        const userData= await UsersModel.findOne({emailId:req.body.emailId});

        userData.tasksList=userData.tasksList.filter((task)=>!task.isCompleted);
        userData.markModified("tasksList");

        await userData.save()
        return res.status(200).json({message:"Completed Tasks Cleared Successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Unable to Clear Completed Tasks"});
    }
}

module.exports.completeTaskController= async(req,res)=>{
    try{
        //Req.body should have emailId and taskIdx
        const userData= await UsersModel.findOne({emailId:req.body.emailId});
        userData.tasksList[req.body.taskIdx].isCompleted=true;
        userData.markModified("tasksList");

        userData.save();

        return res.status(200).json({message:"Task Completed Successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Unable to Complete Task"});
    }
}