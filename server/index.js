var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var personalityHelper = require('./watson/personality-insights');
var watsonHelpers = require('./watson/watson-helpers');
var passport = require('passport');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn();
var tw = require('./social/twitter.js');
var db = require('../database/config');
var dbHelpers = require('../database/helpers/request_helpers');
//-------------------------------------------------------------//
var secret = require('./secrets');

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.set('view engine', 'ejs');

app.use(cookieParser(secret));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: secret, resave: true, saveUnitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.send('Hello world');
});

/**********************/
/**** SOCIAL MEDIA ****/
/**********************/

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
  console.log(req);
  dbHelpers.signup(req, res);
});

app.post('/login', function(req, res) {
  dbHelpers.loginUser(req, res);  
});

app.post('/logout', function(req, res) {
  console.log('was here');
  dbHelpers.logout(req, res);  
});

app.get('/analyses/*', function(req, res) {
  dbHelpers.findAllDataFromAnAnalysis(req, res); 
})

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port 3000.');
});
