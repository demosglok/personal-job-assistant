const mongoose = require('mongoose');

const criteriaSchema = mongoose.Schema({
  key: String,
  name: String,
  type: {type: String, enum: ['text', 'number', 'select']},

  min_acceptable_value: Number, //in case type is number
  start_weight: Number,
  weight_per_increment: Number, //how weight changes when value increases for number/numeric values

  keywords: [{word: {type: String, lowercase: true}, weight: Number, key: String}],// for 'text' type

  select_options: [{option: String, weight: Number, key: String}], //for 'select' type
});

const profileSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: 'User', index: true },
  criterias: [criteriaSchema],
  uniq_url: {type: String, index: true, unique: true},
  name_for_profile: String,

  created_at: Date,
  updated_at: Date,

});


module.exports = mongoose.model('profile', profileSchema);
