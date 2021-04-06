const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    profile_id: { type: mongoose.Schema.ObjectId, ref: 'Profile', index: true },
    answers: mongoose.Schema.Types.Mixed,
    title: String,
    raw_text: String,
    created_at: Date,
    calculated_weight: {type: Number, index: true}
});


module.exports = mongoose.model('Request', requestSchema);
