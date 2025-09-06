const bcrypt= require("bcrypt");
const passport=require('passport');
const UsersModel= require("../models/Users.js");



module.exports.registerController = async (req,res)=>{
    //Req.body should have email and password
    const {email, password}=req.body;
    if(!email || !password){
        res.status(400).json({message:"All fields are required"});
        return;
    }

    if(await UsersModel.findOne({emailId:email})){
        res.status(400).json({message:"User already exists"});
        return;
    }
    else{
        const newUserData={
            loginMethod:"local",
            emailId:email,
            password:await bcrypt.hash(password,10),
            tasksList: [],
            
        }
        console.log(newUserData);
        let newUser = await UsersModel.create(newUserData);
        
        await newUser.save();
        newUserData.password='';
        
        res.status(200).json({...newUserData, message:"User registered successfully"});
        return;
    }
}

module.exports.loginController = async (req,res,next)=>{
    //Req.body must have "email" and "password"
    passport.authenticate('local',{failureFlash: true },(err,user,info)=>{
        if(err){
            return res.status(500).json({message:"Error logging in"});
        }
        if(!user){
            return res.status(401).json({message:info.message});
        }
        
        req.logIn(user,(err)=>{
            if(err){
                return res.status(500).json({message:"Error logging in"});
            }
            else{
                user.password='';
                const userData={
                    emailId: user.emailId,
                    loginMethod: user.loginMethod,
                    _id: user._id,
                    message:"User logged in successfully",
                    isAuthenticated:true,
                }
                return res.status(200).json(userData);
            }
        })
    })(req,res,next);
}

module.exports.logoutController=async (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
            return res.status(500).json({message:"Error logging out"});
        }
    });
    return res.status(200).json({message:"User logged out successfully"});

}