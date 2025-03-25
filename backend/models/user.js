const mongoose=require("mongoose");
const{z}=require("zod");

const Schema = mongoose.Schema

const uservalidationSchema=z.object({
    name:z.string().min(3).max(20).optional(),
    email:z.string().email().optional(),
    password:z.string().min(8).optional(),
    phone:z.string().length(10,""),
    userType:z.enum(["doctor","patient"]).default("patient")
})




const UserSchema = newSchema({
    name:String,
    email:{type:String ,unique:true,required:true},
    password:{type:String,require:true,maxlength:20,minlength:8 },
    phone:{type:String,required:true},
    userType:{type:String ,enum:["doctor","patient"],default:"patient"}

});
const User=mongoos.model("User",userSchema);
module.exports=User;