const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/AluminiDatabase')

const userSchema= mongoose.Schema({
    email:String,
    password:String,
    UserDetail:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"userDetail"
    }]
})

module.exports=mongoose.model('user',userSchema)