const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    profile_id: { type: mongoose.Schema.ObjectId, ref: 'Profile', index: true },
    answers: mongoose.Schema.Types.Mixed,
    raw_text: String,
    recruiter_name: String,
    contact: String,
    created_at: Date,
    calculated_weight: {type: Number, index: true}
});


module.exports = mongoose.model('Request', requestSchema);
