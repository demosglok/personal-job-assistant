const configAuth = require('../config/auth');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/userModel');



function createUserFromProfile(profile) {
  const user = new User();
  user.created_at = Date.now();
  const email = profile.email ? profile.email : ((profile.emails && profile.emails.length > 0) ? profile.emails[0] : null);
  user.email = (email instanceof Object && email.value) ? email.value : (email ? email.toString() : null);
  user.display_name = profile.displayName || (user.email ? user.email.split('@')[0] : '');
  if(profile.name instanceof Object && profile.name.givenName) {
      user.name = `${profile.name.givenName} ${profile.name.familyName}`;
  }
  else if(profile.name instanceof String) {
      user.name = profile.name;
  } else if(profile.first_name || profile.last_name) {
      user.name = `${profile.first_name} ${profile.last_name}`;
  } else {
      user.name = user.display_name;
  }

  return user;
}

async function tryFindUser(req, profile) {
    let user = null;
    if (req.user && req.user.id) {
        user = await User.findById(req.user.id);
    }
    if(!user && profile.email) {
        user = await User.findOne({email: profile.email.toLowerCase()});
    }
    if (!user && profile.emails && profile.emails.length > 0) {
        user = await User.findOne({ email: profile.emails[0].value.toLowerCase() });
    }
    return user;
}

async function updateFBIfNecessary(user, profile) {
    if(!user.facebook || !user.facebook.id) {
        user.facebook = {id: profile.id, username: profile.username, name: profile._json.name};
        await user.save();
    }
}

async function updateGoogleIfNecessary(user, profile) {
    if(!user.google || !user.google.id) {
        user.google = {id: profile.id, name: profile._json.name, given_name: profile._json.given_name, family_name: profile._json.family_name};
        await user.save();
    }
}

async function updateGitHubIfNecessary(user, profile) {
    if(!user.github || !user.github.id) {
        user.github = {id: profile.id, login: profile._json.login, name: profile._json.name};
        await user.save();
    }
}

async function updateLinkedinIfNecessary(user, profile) {
    if(!user.linkedin || !user.linkedin.id) {
        user.linkedin = {id: profile.id,  firstName: profile._json.firstName, lastName: profile._json.lastName};
        await user.save();
    }
}
module.exports = () => {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================
  async function loginFBUser(req, token, refreshToken, profile, done) {
    try {
      let user = await User.findOne({ 'facebook.id': profile.id });
      if (user) return done(null, user);
      user = await tryFindUser(req, profile);
      if (!user) {
          user = createUserFromProfile(profile);
      }

      await updateFBIfNecessary(user, profile);
      done(null, user);
    } catch (e) {
      console.log('error storing fb user profile', e.message);
      done(new Error(e.message));
    }
    return null;
  }

  passport.use(new FacebookStrategy(
    {
      clientID: configAuth.facebookAuth.clientId,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL,
      profileFields: configAuth.facebookAuth.profileFields,
      passReqToCallback: true,
      enableProof: true
    },
    async (req, token, refreshToken, profile, done) => {
      await loginFBUser(req, token, refreshToken, profile, done)
        .catch((e) => {
        console.log('Facebook strategy error', e.message); // eslint-disable-line no-console
        });
    }
  ));

  passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientId,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
    passReqToCallback: true
  },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ 'google.id': profile.id });
        if (user) return done(null, user);
        user = await tryFindUser(request, profile);
        if (!user) {
            user = createUserFromProfile(profile);
        }
        await updateGoogleIfNecessary(user, profile);
        done(null, user);
      } catch (e) {
        console.log('error storing google user profile', e.message);
        done(new Error(e.message));
      }
      return null;
    }
  ));

  passport.use(new GithubStrategy({
    clientID: configAuth.githubAuth.clientId,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL,
    passReqToCallback: true
  },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ 'github.id': profile.id });
        if (user) return done(null, user);
        user = await tryFindUser(request, profile);
        if (!user) {
            user = createUserFromProfile(profile);
        }

        await updateGitHubIfNecessary(user, profile);
        done(null, user);
      } catch (e) {
        console.log('error storing github user profile', e.message);
        done(new Error(e.message));
      }
      return null;
    }
  ));

  passport.use(new LinkedinStrategy({
    clientID: configAuth.linkedinAuth.clientId,
    clientSecret: configAuth.linkedinAuth.clientSecret,
    callbackURL: configAuth.linkedinAuth.callbackURL,
    scope: configAuth.linkedinAuth.scope,
    passReqToCallback: true
  },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ 'linkedin.id': profile.id });
        if (user) return done(null, user);
        user = await tryFindUser(request, profile);
        if (!user) {
            user = createUserFromProfile(profile);
        }

        await updateLinkedinIfNecessary(user, profile);
        done(null, user);
      } catch (e) {
        console.log('error storing linkedin user profile', e.message);
        done(new Error(e.message));
      }
      return null;
    }
  ));
};
