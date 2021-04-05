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
  async saveRequest(req, res) {
    if (req.body.uniq_url) {
      try {
        let profile = await Profile.findOne({uniq_url: req.body.uniq_url});
        if(profile) {
          const request = new Request();
          request.profile_id = profile.id;
          request.uniq_url = req.body.uniq_url;
          request.title = req.body.title;
          request.raw_text = req.body.raw_text;
          requests.created_at = Date.now();
          request.answers = req.body.answers;
          request.calculated_weight = calculate_weight(req.body.answers, profile);
          await request.save();
        } else {
          res.json({ success: false, error: 'candidate profile not found' });
        }

        res.json({ success: true, profile });
      } catch (ex) {
        res.json({ success: false, error: ex.message })
      }
    } else {
      res.json({ success: false, error: 'no uniq_url provided' });
    }
  },
}
