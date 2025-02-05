const mongoose = require("mongoose")

const alumuniSchema=mongoose.Schema({
    email:String,
    password:String,
    UserDetail:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"alumuniDetail"
    }]
})

module.exports=mongoose.model("alumuniDB",alumuniSchema)
