const {users} = require('../models/Users');
const {ObjectId} = require("mongoose").Types;
const helpers = require('../helpers/emailSender');
const jwt = require('jsonwebtoken');
const sha1 = require('sha1');


exports.getUsers = async(req,res)=>{    
   try{
    const usersList = await users.find().sort('-_id');
    return res.status(200).json(usersList);
   }catch(e){
       console.log(e);
       return res.status(500).json('Internal server error');
   }
};

exports.getUser = async(req,res)=>{        
    try{
        const id = req.params.id;
        const user = await users.find({"_id":ObjectId(id)});
        return res.status(200).json(user);
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal server error');
    }
 };

 exports.postUser = async(req,res)=>{    
    try{   
        console.log(req.body) 
        const { name, lastName, email, password} = req.body;
        const secretPass=sha1(password);

        const user = await users.findOne({email}).exec();
        if (user) {
            res.status(500).json({message: "user already exists"});
            return;
        }
        // const user={email,password}
        const token = jwt.sign({user},'geek');
        // res.json(token);

        const newUser = new users({name, lastName, email, secretPass});
        newUser.save();
        helpers.sendMail(name + " " + lastName, email, password);
        return res.status(201).json({email, password});  
        // return res.status(201).json({email, secretPass,token});    

    } catch(e){
        console.log(e);
        return res.status(500).json('Internal server error');
    }
 };

 exports.loginUser = async(req,res)=>{    
    try{    
        const { email, password} = req.body;
        // const user={email,password}
        // const token = jwt.sign({user},'geek');
        const user = await users.findOne({email}).exec();
        if (!user || user.password !== password) {
            res.status(403).json({message: "invalid login"});
            return;    
        }
        res.json({email, password});
        // res.json({email, password,token});        
    }catch(e){
        console.log(e);
        return res.status(500).json('Internal server error');
    }
 };

 exports.deleteUser = async(req,res)=>{   
    try{     
        const id = req.params.id;
        const user = await users.findByIdAndDelete(id);
        return res.json({message:`User deleted ${id}`})
    } catch(e){
        console.log(e);
        return res.status(500).json('Internal server error');
    }
 };