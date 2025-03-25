require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');
const connectDB = require('./config/db');
const { User } = require('./models/user');
const authMiddleware = require('./middleware/Auth');

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cors());

const userValidationSchema = z.object({
    name: z.string().min(3).max(20),
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    phone: z.string().length(10, "Phone must be exactly 10 digits"),
    userType: z.enum(["doctor", "patient"]).default("patient")
});

app.post('/api/auth/signup', async (req, res) => {
  const validation = userValidationSchema.safeParse(req.body);
  if (!validation.success) {
      return res.status(400).json({ error: validation.error.errors });
  }

  try {
      const { name, username, email, password, phone, userType } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
      }

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
          return res.status(400).json({ error: 'Username already exists' });
      }

      const user = new User({
          name,
          username, // Add this
          email,
          password,
          phone,
          userType,
      });

      await user.save();

      const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
  } catch (error) {
      console.error('Signup Error:', error.stack);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.get('/api/auth/me', authMiddleware, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).select('-password');
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         res.json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
