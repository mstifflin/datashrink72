var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var watsonHelpers = require('./watson/watson-helpers');
var passport = require('passport');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn();
var tw = require('./social/twitter.js');
var db = require('../database/config');
var dbHelpers = require('../database/helpers/request_helpers');
var path = require('path')
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



/**********************/
/**** SOCIAL MEDIA ****/
/**********************/

app.get('/twitter', tw.toAuth);
app.get('/twitter/return', tw.fromAuth, tw.toAnalysis, 
  watsonHelpers.analyzeProfile);
//TODO change render test to analysis
app.get('/twitterProfile', ensureLogIn, tw.renderTest);
app.get('/twitterProfile/*', tw.testAnalysis);
// app.get('/twitterProfile', ensureLogIn, tw.toAnalysis);
// app.post('/twitterProfile', function(req, res) {
//   console.log(req.body.username);
// });

/****************/
/**** WATSON ****/
/****************/

app.post('/analysis', watsonHelpers.analyzeProfile);

/****************/
/**** NATIVE ****/
/****************/

app.post('/signup', function(req, res) {
  if (dbHelpers.checkIfUserIsLoggedin(req.cookies.session)) {
    res.send('you are already logged in');
  } else {
    dbHelpers.signup(req, res);
  }
});

app.post('/login', function(req, res) {
  // if (dbHelpers.checkIfUserIsLoggedin(req.cookies.session)) {
  //   res.send('you are already logged in')
  // } else {
    dbHelpers.loginUser(req, res);     
  // }
});

app.post('/logout', function(req, res) {
  dbHelpers.logoutUser(req, res);  
});

app.get('/logout', function(req, res) {
  dbHelpers.logoutUser(req, res);  
});

app.get('/analyze/*', function(req, res) {
  dbHelpers.findAllDataFromAnAnalysis(req, res); 
});

app.get('/publicanalyses', function(req, res) {
  dbHelpers.getPublicAnalyses(req, res);
});

app.get('/useranalyses', function(req, res) {
  dbHelpers.getUserAnalyses(req, res);
});

app.get('*', (req, res) => {
  console.log('IN GET *: ', req.cookies.session);
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port 3000.');
});
