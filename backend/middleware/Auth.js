const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const app=express();

app.use(bodyParser.json());
app.use(cors());

// SET UP conecctiib

mongoose.connect("",{
    useNewUrlParser:true,
})
.then(()=>console.log('Mongodb me aapka swagaat hai'))
.catch(err =>console.log(err));

const UserSchema=new mongoose.Schema({
    name:String,
    email:{type:String ,unique:true,required:true},
    password:{type:String,require:true,maxlength:20,minlength:8 },
    phone:{type:String,required:true},
    userType:{type:String ,enum:["doctor","patient"],default:"patient"}
})
