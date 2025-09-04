const mongoose=require('mongoose')
const {Schema}=require('mongoose')

const usersSchema=new Schema({
    loginMethod: {
        type: String,
        required: true
    },
    emailId:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
    },
    tasksList:{
        type: Array,
        required: true
    }
    
})

module.exports=mongoose.model('Users',usersSchema)