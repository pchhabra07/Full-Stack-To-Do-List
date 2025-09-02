const express=require('express')
const passport=require('passport')

const {registerController, loginController, logoutController} =require('../controllers/UserControllers.js')

const router=express.Router();

router.post('/register', registerController)

router.post('/login',passport.authenticate('local',{failureFlash:true, failureRedirect:'/user/login-failure'}), loginController)

router.get('/login-failure', (req,res)=>{
    const messages=req.flash('error')
    console.log("Error messages from strategy function: ",messages)
    return res.status(401).json({
        message:messages[0]
    })
})

router.get('/logout', logoutController)

module.exports =router;