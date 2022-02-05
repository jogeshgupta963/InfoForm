const mongoose = require("mongoose")


function dbConnect(url){

    return mongoose.connect(url,{
        useNewUrlParser: "true",
        useUnifiedTopology: "true"
    })
    
}
module.exports = dbConnect