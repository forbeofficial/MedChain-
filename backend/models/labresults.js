const mongoose = require('mongoose');
const path = require('path');

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
        type: String,
        required: true,
        validate: {
            validator: v => path.isAbsolute(v) || path.normalize(v) === v,
            message: 'Invalid file path'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        default: ""
    }
});

LabResultSchema.pre("save", function(next) {
    if (!this.reportId) {
        this.reportId = `REP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    next();
});
module.exports = mongoose.model("LabResult", LabResultSchema);
