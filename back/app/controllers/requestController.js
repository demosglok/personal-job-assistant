const { v4: uuidv4 } = require('uuid');
const Profile = require('../models/profileModel');
const Request = require('../models/requestModel');

function getWeightForNumberCriteria(answer, criteria) {
  if(answer < criteria.min_acceptable_value) return 0;
  return criteria.start_weight + (answer - criteria.min_acceptable_value)*criteria.weight_per_increment;
}
function getWeightForTextCriteria(answer, criteria) {
  return criteria.keywords.reduce((acc, keyword) => acc + (answer.toLowerCase().includes(keyword.word.toLowerCase()) ? keyword.weight : 0), 0);
}
function getWeightForSelectCriteria(answer, criteria) {

  const option = criteria.select_options.find(option => option.key == answer);
  if(option) {
    return option.weight;
  }
  return 0;
}

function calculate_weight(answers, profile) {

  return answers.reduce((weight, answer, index) => {
    const criteria = profile.criterias[index];
    if(criteria.key != answer.criteria_key) {
      console.log('alarm, wrong key', criteria.key, answer.criteria_key);
    }
    switch(criteria.type) {
      case 'text':
        return weight + getWeightForTextCriteria(answer.answer, criteria);
      case 'number':
        return weight + getWeightForNumberCriteria(answer.answer, criteria);
      case 'select':
        return weight + getWeightForSelectCriteria(answer.answer, criteria);
    }
    return weight;
  }, 0);
}

const timeperiods = Object.freeze({
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month'
});
const timeperiodsLengthes = Object.freeze({
  [timeperiods.DAY]: 24*60*60 * 1000,
  [timeperiods.WEEK]: 7*24*60*60 * 1000,
  [timeperiods.MONTH]: 30*24*60*60 * 1000,
})
module.exports = {
  async getRequests(req, res) {
    if (req.user) {
      const timeperiod = req.params.timeperiod || timeperiods.DAY;
      let startTime = Date.now() - timeperiodsLengthes[timeperiod];
      try {
        const profile = await Profile.findOne({user_id: req.user.id});
        const requests = await Request.find({profile_id: profile.id, created_at: { $gte: startTime }})
          .sort({calculated_weight:-1})
          .limit(5)
          .exec();
        res.json({ success: true, requests });
      } catch (ex) {
        res.json({ success: false, error: ex.message })
      }
    } else {
      res.json({ success: false, error: 'no authorised user found' });
    }
  },
  async getProfileForRequest(req, res) {
    try {
      const hash = req.params && req.params.hash && req.params.hash.toLowerCase()
      const profile = await Profile.findOne({uniq_url: hash});
      const preparedCriterias = profile.criterias.map(criteria => {
        const result = {name: criteria.name, key: criteria.key, type: criteria.type};
        if(criteria.type == 'select') {
          result.select_options = criteria.select_options.map(option => ({key: option.key || option._id, label: option.option}))
        }
        return result;
      })
      res.json({success: true, name_for_profile: profile.name_for_profile, criterias: preparedCriterias});
    } catch (ex) {
      res.json({success: false, error: ex.message});
    }
  },
  async saveRequest(req, res) {
    if (req.params.hash) {
      try {
        let profile = await Profile.findOne({uniq_url: req.params.hash});
        if(profile) {
          const request = new Request();
          request.profile_id = profile.id;
          request.uniq_url = req.params.hash;
          request.raw_text = req.body.raw_description;
          request.contact = req.body.contact;
          request.recruiter_name = req.body.recruiter_name;
          request.created_at = Date.now();
          request.answers = req.body.answers;
          request.calculated_weight = calculate_weight(req.body.answers, profile);
          await request.save();
          res.json({success: true, request});
        } else {
          res.json({ success: false, error: 'candidate profile not found' });
        }
      } catch (ex) {
        res.json({ success: false, error: ex.message })
      }
    } else {
      res.json({ success: false, error: 'no uniq_url provided' });
    }
  },
}
