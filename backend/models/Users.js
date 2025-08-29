const mongoose=require('mongoose')
const {Schema}=require('mongoose')

const usersSchema=new Schema({
    emailId:{type: String, required: true},
    name:{type: String, required: true},
    tasksList:{type: Object, required: true},
    loginMethod: {type: String, required: true}
})

module.exports=mongoose.model('Users',usersSchema)