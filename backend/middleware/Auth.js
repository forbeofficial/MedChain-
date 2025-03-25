<<<<<<< HEAD
const express = require('express');
=======
const express  =  require('express');
>>>>>>> b0e32cb40e3bd11f13d966bab9c31d23f54c4624
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
<<<<<<< HEAD
require('dotenv').config({ path: '../.env' });
console.log("MONGO_URI:", process.env.MONGO_URI);
const app = express();
=======
const User =require("./user");
mongoose
.connect("",{useNewUrlParser:true,})
.then(()=>console.log('Mongodb me aapka swagaat hai'))
.catch(err =>console.log(err));



const app=express();
>>>>>>> b0e32cb40e3bd11f13d966bab9c31d23f54c4624

app.use(bodyParser.json());
app.use(cors());

<<<<<<< HEAD
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('rs MongoDB Connection Error:', err));

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 5, maxlength: 7 }, // Fixed 'require' typo
    phone: { type: String, required: true },
    userType: { type: String, enum: ["doctor", "patient"], default: "patient" }
});

const User = mongoose.model("User", UserSchema);

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password, phone, userType } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            userType,
        });

        await user.save(); 
        res.json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { email: user.email }, process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );

        res.json({ token });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
});
=======
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


>>>>>>> b0e32cb40e3bd11f13d966bab9c31d23f54c4624
