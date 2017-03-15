var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var API = require('./API_KEYS.js');
var passport = require('passport');
var ensureLogIn = require('connect-ensure-login');
var FacebookStrat = require('passport-facebook').Strategy;

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.set('testViews', __dirname + '/testViews');
app.set('view engine', 'ejs');

passport.use(new FacebookStrat({
    clientID: API.facebookID,
    clientSecret: API.facebookSecret,
    callbackURL: 'http://localhost:3000/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return cb(null, profile);
  }
));

//TODO: 
// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: 'keyboard cat', resave: true, saveUnitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.send('Hello world');
});

app.get('/facebook', passport.authenticate('facebook'));

app.get('/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/'}),
  function(req, res) {
    // TODO: redirect to data analysis - test page for now
    res.redirect('/facebookProfile');
  });

app.get('/facebookProfile', 
  ensureLogIn.ensureLoggedIn(),
  function(req, res) {
    res.render('facebookProfile', { user: req.user });
  });

app.listen(3000, function() {
  console.log('Listening on port 3000.');
});