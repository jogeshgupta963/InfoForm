const mongoose = require("mongoose")


function dbConnect(url){

    return mongoose.connect(url)
    
}
module.exports = dbConnect