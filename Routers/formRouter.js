
const express = require("express");
const userModel = require("../Models/userModel")
const {getPage,saveInfo,postSearch,getEditPage,editPage,getDelPage,otpSender,deleteData,otpCookieVerification} = require("../controllers/formController")
const formRouter=express.Router();


formRouter
.route("/form")
.get(getPage)
.post(saveInfo)

formRouter
.route("/form/search")
.post(postSearch);

formRouter
.route("/form/edit")
.get(getEditPage)
.put(editPage)

formRouter
.route("/form/delete")
.get(getDelPage)
.post(otpSender)
.delete(otpCookieVerification,deleteData)

module.exports = formRouter;
