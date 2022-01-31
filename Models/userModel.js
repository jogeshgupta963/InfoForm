const mongoose = require("mongoose")


const userSchema = mongoose.Schema({

    name:{
           type:String,
           required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    hobbies:{
        type:String,
        required:true,

    },
    skills:{
        type:String,
        required:true
    }
})
const userModel = mongoose.model('userModel',userSchema);

module.exports = userModel;