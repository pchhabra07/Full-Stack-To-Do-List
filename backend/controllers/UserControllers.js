const bcrypt= require("bcrypt");

const UsersModel= require("../models/Users.js");

module.exports.registerController = async (req,res)=>{
    //Req.body should have name, email and password
    const {name, email, password}=req.body;
    if(!name || !email || !password){
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
            name:name,
            tasksList: [],
            
        }
        console.log(newUserData);
        let newUser = await UsersModel.create(newUserData);
        
        await newUser.save();
        
        res.status(200).json({message:"User registered successfully"});
        return;
    }
}

module.exports.loginController = async (req,res)=>{
    //Req.body must have "email" and "password"
    if(req.user){
        let userData=req.user;
        console.log('Login Controller Function:',userData);
        userData.isAuthenticated=true;
        return res.status(200).json(userData);
    }
    else{
        return res.status(400).json({message:"User not logged in", isAuthenticated:false});
    }
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