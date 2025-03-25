const mongoose = require("mongoose");
const { z } = require("zod");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const uservalidationSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    phone: z.string().length(10, "Phone must be exactly 10 digits"),
    userType: z.enum(["doctor", "patient"]).default("patient")
});

const UserSchema = new Schema({
    name: String,
    username: { type: String, unique: true, required: true }, // Add this
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, maxlength: 20, minlength: 8 },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: v => v.length === 10 && /^\d+$/.test(v),
            message: "Phone must be exactly 10 digits"
        }
    },
    userType: { type: String, enum: ["doctor", "patient"], default: "patient" }
});
const DoctorSchema = new Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
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

const User = mongoose.model("User", UserSchema);
const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = { User, Doctor };
