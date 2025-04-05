const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AllergySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    allergen: { type: String, required: true },
    reaction: { type: String, required: true },
    severity: { type: String, enum: ['mild', 'moderate', 'severe'], required: true },
    dateDiagnosed: { type: Date, required: false }, 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Allergy', AllergySchema);
