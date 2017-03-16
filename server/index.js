var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var personalityHelper = require('./watson/personality-insights');
var watsonHelpers = require('./watson/watson-helpers');
var passport = require('passport');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn();
var fb = require('./social/facebook.js');
var tw = require('./social/twitter.js');

var db = require('../database/config');
var dbHelpers = require('../database/helpers/request_helpers');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: 'keyboard cat', resave: true, saveUnitialized: true}));

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



app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.send('Hello world');
});

/**********************/
/**** SOCIAL MEDIA ****/
/**********************/

app.get('/facebook', fb.toAuth);
app.get('/facebook/return', fb.afterAuth, fb.toAnalysis);
//TODO change render test to analysis
app.get('/facebookProfile', ensureLogIn, fb.renderTest);

app.get('/twitter', tw.toAuth);
app.get('/twitter/return', tw.fromAuth, tw.toAnalysis);
//TODO change render test to analysis
app.get('/twitterProfile', ensureLogIn, tw.renderTest);

/****************/
/**** WATSON ****/
/****************/

// get request for testing purposes
app.get('/analysis/text', function(req, res, next) {
// app.post('/analysis/text', function(req, res, next) {
  var params = {
    text: require('./watson/speech'), // example text
    // all of the following settings can be turned on for json:
    // content_items: require('./profile.json').contentItems,
    // consumption_preferences: true,
    // raw_scores: true,
    headers: {
      // 'accept-language': 'en',
      // 'accept': 'application/json'
      'Content-type': 'text/plain'
    }
  };

  personalityHelper.profileFromText(params)
    .then(function(profile) {
      var parseParams = {
        name: 'Me', // name from form
        context: 'twitter', // context from somewhere in the request
        userId: 0 // userId from session
      }
      res.send(watsonHelpers.parseProfile(parseParams, profile));
    })
    .catch(next);
});

/****************/
/**** NATIVE ****/
/****************/

app.post('/signup', function(req, res) {
  dbHelpers.signup(req, res);
});

app.post('/login', function(req, res) {
  dbHelpers.loginUser(req, res);  
});

app.get('/*', function(req, res) {
  //take the id included in the star. 
  //query the database for the information for the respective analysis,
  //send the display page with the current analysis data
  res.send('in progress');
})

app.listen(3000, function() {
  console.log('Listening on port 3000.');
});