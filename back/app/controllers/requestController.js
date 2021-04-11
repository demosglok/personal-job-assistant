const { v4: uuidv4 } = require('uuid');
const Profile = require('../models/profileModel');
const Request = require('../models/requestModel');

function calculate_weight(answers, profile) {
  return 1;
}
module.exports = {
  async getRequests(req, res) {
    if (req.user) {
      try {
        const profile = await Profile.findOne({user_id: req.user.id});
        const requests = await Request.findAll({profile_id: profile.id});
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
          result.select_options = criteria.select_options.map(option => ({key: option.key ?? option._id, label: option.option}))
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
