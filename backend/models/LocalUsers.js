const mongoose=require('mongoose')
const {Schema}=require('mongoose')

const localUsersSchema=new Schema({
    emailId:{
        type: String,
        required: true,
        ref:'Users',
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
})

module.exports=mongoose.model('LocalUsers',localUsersSchema)