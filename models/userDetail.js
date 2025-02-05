const mongoose=require('mongoose')

const userDetailSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,        
        required:true
    },
    educationLevel:{
        type:String,
        required:true
    },
    interests:{
        type:[String],
        required:true
    }
})

module.exports=mongoose.model('userDetail',userDetailSchema)