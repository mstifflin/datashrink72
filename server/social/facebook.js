var API = require('./API_KEYS.js');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: API.facebookID,
    clientSecret: API.facebookSecret,
    callbackURL: 'http://localhost:3000/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('ACCESS: ', accessToken);
    console.log('REFRESH: ', refreshToken);
    console.log('PROFILE: ', profile);
    return cb(null, profile);
  }
));

module.exports.toAuth = passport.authenticate('facebook');
module.exports.afterAuth = passport.authenticate('facebook', { failureRedirect: '/'});
module.exports.toAnalysis = function(req, res) {
  res.redirect('/facebookProfile');
}

module.exports.renderTest = function(req, res) {
  res.render('testProfile', { user: req.user });
};
