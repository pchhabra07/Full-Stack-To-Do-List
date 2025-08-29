const express=require('express')

const {newUserController, userLoginController} =require('../controllers/UserControllers.js')
const {} =require('../controllers/TaskControllers.js')

const router=express.Router();

router.post('/sign-up', newUserController)

router.get('/sign-in', userLoginController)