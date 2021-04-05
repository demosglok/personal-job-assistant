const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, lowercase: true, index: true},
  display_name: String,

  created_at: Date,
  facebook: {
    id: { type: String, index: true },
    username: String,
    name: String,
  },
  google: {
    id: { type: String, index: true },
    given_name: String,
    family_name: String,
    name: String
  },
  linkedin: {
    id: { type: String, index: true },
    firstName: mongoose.Schema.Types.Mixed,
    lastName: mongoose.Schema.Types.Mixed
  },
  github: {
    id: { type: String, index: true },
    login: String,
    name: String
  },
});


module.exports = mongoose.model('User', userSchema);
