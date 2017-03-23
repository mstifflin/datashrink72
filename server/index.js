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
var path = require('path')
//-------------------------------------------------------------//

var app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: 'keyboard cat', resave: true, saveUnitialized: true}));

app.use(passport.initialize());
app.use(passport.session());



/**********************/
/**** SOCIAL MEDIA ****/
/**********************/
app.get('/*', (req, res, next) => {
  console.log('getting new get request', req)
  next()
})


app.get('/twitter', tw.toAuth);
app.get('/twitter/return', tw.fromAuth, tw.toAnalysis);
//TODO change render test to analysis
app.get('/twitterProfile', ensureLogIn, tw.renderTest);
app.get('/twitterProfile/*', tw.testAnalysis);

/****************/
/**** WATSON ****/
/****************/

// get request for testing purposes
app.post('/analysis/text', function(req, res, next) {
// app.post('/analysis/text', function(req, res, next) {
  var params = {
    text: req.body.text, //require('./watson/speech'), // example text
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
        name: req.body.name, // name from form
        context: 'custom', // context from somewhere in the request
        userId: 0 // userId from session
      }
      watsonHelpers.parseProfile(parseParams, profile)
        .then(function(analysisId) {
          console.log('about to redirect', analysisId)
          res.redirect(301, '/analyses/' + analysisId);
        }) 
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

app.get('/analyze/*', function(req, res) {
  dbHelpers.findAllDataFromAnAnalysis(req, res); 
});

app.get('/publicanalyses', function(req, res) {
  dbHelpers.getPublicAnalyses(req, res);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
});



app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port 3000.');
});
