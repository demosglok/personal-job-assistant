
const User = require('../models/userModel');

module.exports = {
  async getUser(req, res) {
    if (req.user) {
      try {

        res.json({ success: true, user: req.user });
      } catch (ex) {
        res.json({ success: false, error: ex.message })
      }
    } else {
      res.json({ success: false, user: null });
    }
  },
}
