const express  =  require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User =require("./user");
mongoose
.connect("",{useNewUrlParser:true,})
.then(()=>console.log('Mongodb me aapka swagaat hai'))
.catch(err =>console.log(err));



const app=express();

app.use(bodyParser.json());
app.use(cors());

// SET UP conecctiib



app.post("/signup",async (req,res)=> {
const validation=userValidationSchema.safeParse(req.body);
if (!validation.success) {
    return res.status(400).json(validation.errors);
}
  try {
    const { name, email, password,phone,userType } = req.body;

  
  const existingUser=await User.findOne({email});
  if(existingUser){
return  res.status(400).json({message:"user already exists"});
  }

  const hashedPassword= await bcrypt.hash(password,5,);

  const user=new User({
    name,
    email,
    password:hashedPassword,
    phone,
    userType,


});

await newUser.save();
res.json({message:"user created successfully"});
} catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  });


const PORT =process.env.PORT||3000;
app.listen(PORT, () => {
    console.log(`Srunning on port ${PORT}`);
});


