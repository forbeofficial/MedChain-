const mongoose=require("mongoose");
const{z}=require("zod");
<<<<<<< HEAD
const bcrypt=require("bcrypt")
=======

>>>>>>> b0e32cb40e3bd11f13d966bab9c31d23f54c4624
const Schema = mongoose.Schema

const uservalidationSchema=z.object({
    name:z.string().min(3).max(20).optional(),
    email:z.string().email().optional(),
    password:z.string().min(8).optional(),
    phone:z.string().length(10,""),
    userType:z.enum(["doctor","patient"]).default("patient")
})




<<<<<<< HEAD
const UserSchema = new Schema({
=======
const UserSchema = newSchema({
>>>>>>> b0e32cb40e3bd11f13d966bab9c31d23f54c4624
    name:String,
    email:{type:String ,unique:true,required:true},
    password:{type:String,require:true,maxlength:20,minlength:8 },
    phone:{type:String,required:true},
    userType:{type:String ,enum:["doctor","patient"],default:"patient"}

});
// const User=mongoos.model("User",userSchema);
// module.exports=User;


const DoctorSchema=new Schema({
    name:String,
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true},


});

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

DoctorSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User=mongoose.model("User",UserSchema);
const Doctor=mongoose.model("Doctor",DoctorSchema);
module.exports={User,Doctor};