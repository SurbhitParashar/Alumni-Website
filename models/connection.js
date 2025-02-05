const mongoose=require("mongoose")

const connectionSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    alumId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"alumuniDB",
        required:true
    },
    connectedAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("connection",connectionSchema)