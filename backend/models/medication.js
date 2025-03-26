const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    frequency: { type: String, required: true },
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    createdAt: { type: Date, default: Date.now }
});


MedicationSchema.pre('save', function (next) {
    if (this.startDate && this.endDate && this.startDate > this.endDate) {
        return next(new Error('startDate must be before endDate'));
    }
    next();
});

module.exports = mongoose.model('Medication', MedicationSchema);
