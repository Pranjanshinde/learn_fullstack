const express=require("express");
const { userModel } = require("../model/User.model");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRouter=express.Router();

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass,age}=req.body;
try {

    bcrypt.hash(pass, 5, async(err, hash)=> {
        const user=new userModel({name,email,age,pass:hash});
await user.save();
res.send({"msg":"new user has been added"});
    });
    
} catch (error) {
    console.log(error.massage);
}
});

userRouter.post("/login",async(req,res)=>{
const {email,pass}=req.body;
try {
    let user =await userModel.findOne({email:email});
    if(user)
    {
        bcrypt.compare(pass, user.pass, function(err, result) {
            if(result)
            {
                var token = jwt.sign({ author:user.author,author_id:user._id }, 'masai');
        res.send({"msg":"login successfull","token":token});
            }else{
                res.send({"msg":"wrong credentails"});
            }
        });
        
    }else{
        res.send({"msg":"wrong credentails"});
    }
} catch (error) {
    res.send(error.massage);
}
});

module.exports={userRouter};