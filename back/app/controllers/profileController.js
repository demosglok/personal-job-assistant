const { v4: uuidv4 } = require('uuid');
const Profile = require('../models/profileModel');

module.exports = {
  async getProfile(req, res) {
    if (req.user) {
      try {
        const profile = await Profile.findOne({user_id: req.user.id});
        res.json({ success: true, profile });
      } catch (ex) {
        res.json({ success: false, error: ex.message })
      }
    } else {
      res.json({ success: false, error: 'no authorised user found' });
    }
  },
  async saveProfile(req, res) {
    if (req.user) {
      try {
        let profile = await Profile.findOne({user_id: req.user.id}); // yep, not ideal, we're assuming there is only one profile per user and not validating it
        if(!profile) {
          profile = new Profile();
          profile.user_id = req.user.id;
          profile.created_at = Date.now();
          profile.uniq_url = uuidv4();
        }
        if(req.body.type) {
          profile.type = req.body.type;
        }
        if(req.body.criterias) {
          profile.criterias = req.body.criterias;
        }
        profile.updated_at = Date.now();
        await profile.save();
        res.json({ success: true, profile });
      } catch (ex) {
        res.json({ success: false, error: ex.message })
      }
    } else {
      res.json({ success: false, error: 'no authorised user found' });
    }
  },
}
