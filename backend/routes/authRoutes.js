const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Patient, Doctor, Diagnostics } = require("../models/user");
const { userValidationSchema, loginValidationSchema } = require("../models/user");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", async (req, res) => {
    const validation = userValidationSchema.safeParse(req.body);
    if (!validation.success) return res.status(400).json({ errors: validation.error.errors });
    try {
        const { name, username, email, password, phone, blockchainWallet,  specialization, licenseNumber, hospital ,userType } = req.body;
        const [existingUser, existingUsername] = await Promise.all([
            User.findOne({ email }),
            User.findOne({ username })
        ]);
        if (existingUser) return res.status(400).json({ error: "Email already exists" });
        if (existingUsername) return res.status(400).json({ error: "Username already exists" });

        const user = new User({ name, username, email, password, phone, blockchainWallet, userType });
        await user.save();
        if (userType === "doctor") {
            const existingDoctor = await Doctor.findOne({ licenseNumber });
            if (existingDoctor) {
                await User.deleteOne({ _id: user._id });
                return res.status(400).json({ error: "Doctor with this license number exists" });
            }
            const doctor = new Doctor({ userId: user._id, specialization, licenseNumber, hospital });
            await doctor.save();
        }
        const token = jwt.sign({ id: user._id, userType }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ message: "User created successfully", token, userId: user._id });
    } catch (error) {
        console.error("Signup Error:", error.stack);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

router.post("/login", async (req, res) => {
    const validation = loginValidationSchema.safeParse(req.body);
    if (!validation.success) return res.status(400).json({ errors: validation.error.errors });

    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Login successful", token, userId: user._id });
    } catch (error) {
        console.error("Login Error:", error.stack);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

router.get("/verify-token", authMiddleware, (req, res) => {
    res.json({ message: "Token is valid", user: req.user });
});

module.exports = router;
