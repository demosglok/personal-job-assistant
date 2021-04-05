const passport = require('passport');
const authConfig = require('../config/auth');
const debug = require('debug')('imagery:authController');


module.exports = {
  async facebook(req, res, next) {
    req.session.redirect_after_login = req.query.redirect_after_login;
    passport.authenticate('facebook', { scope : authConfig.facebookAuth.scope})(req,res,next);
  },
  async facebookCallback(req, res, next) {
    try {
      passport.authenticate('facebook', {
        successRedirect : req.session.redirect_after_login || '/',
        failureRedirect : '/failure'
      })(req,res,next);
    } catch(ex) {
      console.log('failed to authenticate via fb', ex.message);
      res.send(`Failed to authenticate via facebook. ${ex.message}. Please try again later`);
    }

  },

  async google(req, res, next) {
    req.session.redirect_after_login = req.query.redirect_after_login;
    passport.authenticate(
	'google',
	{
	    scope : authConfig.googleAuth.scope,
	    prompt: authConfig.googleAuth.prompt
	}
    )(req,res,next);
  },
  async googleCallback(req, res, next) {
    try {
      passport.authenticate('google', {
        successRedirect : req.session.redirect_after_login || '/',
        failureRedirect : '/failure'
      })(req,res,next);
    } catch(ex) {
      console.log('failed to authenticate via google', ex.message);
      res.send(`Failed to authenticate via google. ${ex.message}. Please try again later`);
    }
  },

  async linkedin(req, res, next) {
    req.session.redirect_after_login = req.query.redirect_after_login;
    passport.authenticate(
	'linkedin',
	{
	    scope : authConfig.linkedinAuth.scope,
	}
    )(req,res,next);
  },
  async linkedinCallback(req, res, next) {
    try {
      passport.authenticate('linkedin', {
        successRedirect : req.session.redirect_after_login || '/',
        failureRedirect : '/failure'
      })(req,res,next);
    } catch(ex) {
      res.send(`Failed to authenticate via linkedin. ${ex.message}. Please try again later`);
    }

  },


  async github(req, res, next) {
    req.session.redirect_after_login = req.query.redirect_after_login;
    passport.authenticate(
	'github',
	{
	    scope : authConfig.githubAuth.scope,
	}
    )(req,res,next);
  },
  async githubCallback(req, res, next) {
    try {
      passport.authenticate('github', {
        successRedirect : req.session.redirect_after_login || '/',
        failureRedirect : '/failure'
      })(req,res,next);
    } catch(ex) {
      res.send(`Failed to authenticate via github. ${ex.message}. Please try again later`);
    }

  },


  async logout(req, res) {
    delete req.user;
    req.session.destroy(err => res.json({success: !err, message: 'logged out', error: err}));
  }
}
