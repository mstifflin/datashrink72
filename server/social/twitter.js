var API = require('./API_KEYS.js');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

passport.use(new Strategy({
    consumerKey: API.twitterKey,
    consumerSecret: API.twitterSecret,
    callbackURL: 'http://127.0.0.1:3000/twitter/return'
  },
  function(token, tokenSecret, profile, cb) {
    console.log('TOKEN: ', token);
    console.log('SECRET: ', tokenSecret);
    console.log('PROFILE: ', profile);

    return cb(null, profile);
  }));

module.exports.toAuth = passport.authenticate('twitter');
module.exports.fromAuth = passport.authenticate('twitter', { failureRedirect: '/'});

module.exports.toAnalysis = function(req, res) {
  res.redirect('/twitterProfile');
};

module.exports.renderTest = function(req, res) {
  res.render('testProfile', { user: req.user });
};
