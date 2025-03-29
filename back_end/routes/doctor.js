const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: String, 
    password: String
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
