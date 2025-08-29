const mongoose=require('mongoose')
const {Schema}=require('mongoose')

const googleUsersSchema=new Schema({
    emailId:{type: String, required: true, ref:'Users'},
    data:{type: Object, required: true}
})

module.exports=mongoose.model('GoogleUsers',googleUsersSchema)