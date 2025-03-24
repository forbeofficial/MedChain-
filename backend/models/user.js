const mongoose=require("mongoose");
const Schema = mongoose.Schema
const UserSchema = newSchema({
    name:String,
    email:{type:String ,unique:true,required:true},
    password:{type:String,require:true,maxlength:20,minlength:8 },
    phone:{type:String,required:true},
    userType:{type:String ,enum:["doctor","patient"],default:"patient"}

});
const User=mongoos.model("User",userSchema);
module.exports=User;