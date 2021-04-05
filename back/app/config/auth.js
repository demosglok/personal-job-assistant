module.exports = {
    'facebookAuth' : {
        'clientId' 	:  process.env.FACEBOOK_KEY,
        'clientSecret' 	: process.env.FACEBOOK_SECRET,
        'callbackURL' 	: process.env.BACKEND_URL + 'auth/facebook-callback',
        'scope'	: ['public_profile','email'],
        'profileFields': ['id', 'email', 'displayName', ]
    },
    'googleAuth' : {
        'clientId' 	:  process.env.GOOGLE_KEY,
        'clientSecret' 	: process.env.GOOGLE_SECRET,
        'callbackURL' 	: process.env.BACKEND_URL + 'auth/google-callback',
        'scope': ['profile', 'email'],
        'prompt': 'select_account'
    },
    'linkedinAuth' : {
        'clientId' 	:  process.env.LINKEDIN_KEY,
        'clientSecret' 	: process.env.LINKEDIN_SECRET,
        'callbackURL' 	: process.env.BACKEND_URL + 'auth/linkedin-callback',
        'scope': ['r_emailaddress', 'r_liteprofile'], // reademail //
        'prompt': 'select_account'
    },
    'githubAuth' : {
        'clientId' 	:  process.env.GITHUB_KEY,
        'clientSecret' 	: process.env.GITHUB_SECRET,
        'callbackURL' 	: process.env.BACKEND_URL + 'auth/github-callback',
        'scope': ['user:email'], // 'read:user',
        'prompt': 'select_account'
    },
};
