
const express = require("express");
const mongoose =require('mongoose');
const cors =require('cors');
const cookieParser = require("cookie-parser")
const formRouter = require("./Routers/formRouter")
const userModel = require("./Models/userModel")
const dbConnect = require("./connection/connect");

require("dotenv").config();

const app = express();
 
app.use(express.json());
app.use(cors());
app.use("/css",express.static(__dirname+"/public/assets/css"))
app.use("/js",express.static(__dirname+"/public/assets/js"))
app.use(cookieParser())
app.use('/info',formRouter);

(async function dbConnection(){
    try {
        await dbConnect(process.env.linkDb);
        console.log("db connected")
        app.listen(80,()=>console.log("server connected"));
    } catch (error) {
            console.log(error);
    }

})();

