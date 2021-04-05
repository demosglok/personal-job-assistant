const mongoose = require('mongoose');

const criteriaSchema = mongoose.Schema({
  name: String,
  type: {type: String, enum: ['text', 'number', 'select']},
  weight: Number,

  min_acceptable_value: Number, //in case type is number
  weight_per_increment: Number, //how weight changes when value increases for number/numeric values

  keywords: [{word: String, weight: Number}],// for 'text' type

  select_options: [{option: String, weight: Number}], //for 'select' type
});

const profileSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: 'User', index: true },
  criterias: [criteriaSchema],
  uniq_url: {type: String, index: true, unique: true},

  created_at: Date,
  updated_at: Date,

});


module.exports = mongoose.model('profile', profileSchema);
