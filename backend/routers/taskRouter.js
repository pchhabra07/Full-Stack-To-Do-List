const express=require('express')

const {getTasksController, addTaskController, editTaskController, deleteTaskController, clearCompletedController, completeTaskController} =require('../controllers/TaskControllers.js')

const router=express.Router();

router.get('/get-tasks', getTasksController)

router.post('/add-task', addTaskController)

router.post('/edit-task', editTaskController)

router.post('/delete-task', deleteTaskController)

router.get('/clear-completed', clearCompletedController)

router.post('/complete-task', completeTaskController)


module.exports =router;