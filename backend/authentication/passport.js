const passport=require('passport');
const bcrypt=require('bcrypt');

const LocalStrategy=require('passport-local').Strategy;

const Users=require('../models/Users.js');

require('dotenv').config();

passport.use('local',new LocalStrategy(
   {
    usernameField:'email',
   passwordField:'password'
    },
    async (email,password,done)=>{
        //Req.body must have "email" and "password"
        try{
            const user=await Users.findOne({emailId:email});
            if(!user){
                return done(null,false,{message:'User not found'});
            }
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                return done(null,false,{message:'Incorrect password'});
            }
            console.log('Strategy Function: ',user);
            return done(null,user);
        }
        catch(error){
            done(error);
        }
    }
))

passport.serializeUser((user,done)=>{
    console.log('Serializing User: ',user._id);
    done(null,user._id);
})

passport.deserializeUser(async (id,done)=>{
    try{
        const user=await Users.findOne({_id: id});
        if(!user){
            return done(null,false,{message:'User not found'});
        }

        console.log('Deserializing User: ',user);
        done(null,user);
    }
    catch(error){
        done(error);
    }
})