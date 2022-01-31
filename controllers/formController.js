const express=require("express");
const path=require("path");
const nodemailer = require("nodemailer")
const userModel = require("../Models/userModel")
require("dotenv").config()

//get fun for index.html
function getPage(req,res){

    res.sendFile(path.join(__dirname,"../public/","index.html"));
}
//post for inserting data in db
async function saveInfo(req,res){
    try{
        let data=req.body;
        const isUnique = await userModel.findOne({email:data.email})
        
        if(isUnique == null){
         await userModel.create(data);
    
        res.json({
            unique:true,
            
        })
      }
      else{
          res.json({
              unique:false
          })
      }
    }
        catch(err){
        res.json({unique:false});
        }   
}
//post for fetching data from db
async function postSearch(req,res){
    try {
        let data=req.body.searchBar;
        
        let foundData = await userModel.findOne({email:data});
        
        if(foundData != null){
        res.json({foundData,valid:true});
        }else{
        res.json({foundData,valid:false});
        }
    } catch (error) {
        res.json({message:"data not found"});
    }
    
}
//get for updating data from db
function getEditPage(req,res){
    
    res.sendFile(path.join(__dirname,"../public/","editForm.html"));
}
//updating data in db
async function editPage(req,res){
    try{
    let data=req.body;
    
    let userData = await userModel.findOneAndUpdate({email:data.email},data)
        
        if(userData != null){
        res.json({valid:true});
        }else{
            res.json({valid:false});
        }
    }
    catch(err){
        res.send(err);
    }
}
//for getting delete page
function getDelPage(req,res){

    res.sendFile(path.join(__dirname,"../public/","deleteForm.html"));

}


async function otpSender(req,res){
    try {
        let userData = req.body;
        

      console.log(userData);
  
  
        let gmailPass = process.env.gmailPass
        
         let transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           user: 'jogeshgupta963@gmail.com',
            pass: gmailPass
           }
        });

        let otp = parseInt(Math.random()*10000);
        let info =  transporter.sendMail({
        from: '"OTP Verification 👻" <jogeshgupta963@gmail.com>' ,
         to:userData.email, 
         subject: "Enter this otp to delete ur registered data ", 
           html: `<b>Your OTP:${otp} </b>`,
        });

    console.log("Message sent: %s", info.messageId);
 
     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  

      console.log("Message sent: %s", info.messageId);
      
      return res.json({success:true,otp});
            
            
            
          } catch (err) {
            res.json({success:false,otp});
          }
          
    
}

module.exports = {
    getPage,saveInfo,postSearch,getEditPage,editPage,getDelPage,otpSender
}