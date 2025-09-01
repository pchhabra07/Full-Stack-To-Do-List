const bcrypt= require("bcrypt");

const UsersModel= require("../models/Users.js");
const GoogleUsersModel= require("../models/GoogleUsers.js");
const LocalUsersModel= require("../models/LocalUsers.js");

module.exports.registerController = async (req,res)=>{
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
            emailId:email,
            name:name,
            tasksList: [],
            loginMethod:"local"
        }
        console.log(newUserData);
        let newUser = await UsersModel.create(newUserData);
        
        const localUserData={
            emailId:email,
            password:await bcrypt.hash(password,10),
            name:name
        }
        console.log(localUserData);
        let newLocalUser = await LocalUsersModel.create(localUserData);

        
        await newUser.save();
        await newLocalUser.save();
        
        res.status(200).json({message:"User registered successfully"});
        return;
    }
}

module.exports.loginController = async (req,res)=>{
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
    console.log('..')
}