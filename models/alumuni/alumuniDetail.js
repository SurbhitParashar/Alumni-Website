const mongoose=require('mongoose')

const userDetailSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"alumuniDB",
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
    tech:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('alumuniDetail',userDetailSchema)