const mongoose = require("mongoose");

const LabResultSchema = new mongoose.Schema({
    reportId: {
        type: String,  
        unique: true,
        required: true,
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    testName: {
        type: String,
        required: true,
        enum: ["Blood Test", "Urine Test", "Imaging Test", "other"]
    },
    resultValue: {
        type: String,
        required: true
    },
    reportFile: {
        type: String
    },
    date: {
        type: Date,
        default: () => new Date()
    },
    notes: {
        type: String,
        default: ""
    }
});


LabResultSchema.pre("save", function(next) {
    try {
        if (!this.reportId) {
            this.reportId = `REP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            
        }
        next();
    } catch (error) {
        next(new Error(`Failed to generate reportId: ${error.message}`));  // nyan ith debugger use cheytat aan. 
    }
});

module.exports = mongoose.model("LabResult", LabResultSchema);
