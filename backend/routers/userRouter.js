const express=require('express')
const passport=require('passport')

const {registerController, loginController, logoutController} =require('../controllers/UserControllers.js')

const router=express.Router();

router.post('/register', registerController)

router.post('/login', loginController)

router.get('/logout', logoutController)

module.exports =router;