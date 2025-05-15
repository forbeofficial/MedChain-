const mongoose = require("mongoose");
const { z } = require("zod");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

// Enhanced Zod validation schema
const userValidationSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(20, "Name must not exceed 20 characters"),
    username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters").max(20, "Password must not exceed 20 characters"),
    phone: z.string().regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
    blockchainWallet: z.string().min(10, "blockchain wallet must be at least 10 characters").max(20,"max 20"),
    userType: z.enum(["doctor", "patient"]).default("patient")
});

const loginValidationSchema = z.object({
    phone: z.string().regex(/^\d{10}$/, "Phone must be exactly 10 digits"),
    password: z.string().min(8, "Password must be at least 8 characters")
});

// Mongoose User Schema
const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true,
        minlength: 3,
        maxlength: 20
    },
    username: { 
        type: String, 
        unique: true, 
        required: true, 
        index: true,
        minlength: 3,
        maxlength: 30,
        match: /^[a-zA-Z0-9_]+$/
    },
    email: { 
        type: String, 
        unique: true, 
        required: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: true, 
        minlength: 8, 
        maxlength: 20 
    },
    blockchainWallet: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 20
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: v => /^\d{10}$/.test(v),
            message: "Phone must be exactly 10 digits"
        }
    },
    userType: { 
        type: String, 
        enum: ["doctor", "patient"], 
        default: "patient",
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date 
    }
});

// Doctor Schema
const DoctorSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        unique: true,
        index: true
    },
    specialization: { 
        type: String, 
        required: true,
        enum: [
            "General Practice",
            "Cardiology",
            "Neurology",
            "Pediatrics",
            "Other"
        ]
    },
    licenseNumber: { 
        type: String, 
        required: true, 
        unique: true,
        match: /^[A-Z0-9-]{6,12}$/,
        message: "License number must be 6-12 alphanumeric characters with optional hyphens"
    },
    hospital: { 
        type: String, 
        required: true,
        maxlength: 100
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Pre-validation hook to validate user input using Zod schema
UserSchema.pre('validate', function(next) {
    try {
        userValidationSchema.parse(this.toObject());
        next();
    } catch (error) {
        next(error);
    }
});

// Password hashing middleware
UserSchema.pre('save', async function(next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        this.updatedAt = Date.now();
        next();
    } catch (error) {
        next(new Error(`Password hashing failed: ${error.message}`));
    }
});

// Method to compare passwords during login
UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Export models and schemas
const User = mongoose.model("User", UserSchema);
const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = { User, Doctor, loginValidationSchema, userValidationSchema };
