

var db = require('../config');
var User = require('../models/users');
var Analysis = require('../models/analyses');
var Trait = require('../models/traits');
var AnalysisTrait = require('../models/analyses_traits');

module.exports = {
	loginUser: function(req, res) {
		username = req.body.username;
		password = req.body.password;

		User.findOne({username: username})
		.exec(function(err, user) {
			if (err) {
				console.log('there was an error in looking up the username in the database', err);
				res.send(err);
			} else if (user) {
				if (User.comparePassword(password, user.salt, user.password)) {
					//send a response that the user has successfully logged in
					//create a new session for the user
					res.send('you are successfully logged in');
				} else {
					console.log('attempted password does not equal actual password');
					res.send('login in failed');
				}
			} else {
				res.send('login failed');
			}
		})
	},

	signup: function(req, res) {
		username = req.body.username;
		email = req.body.email;
		password = req.body.password;

		if (validateEmail(email)) {
			User.findOne({username: username})
			.exec(function(err, user) {
				if(!user) {
					var newUser = new User({
						username: username,
						password: password, //password should automatically hash on save
						email: email,
						salt: undefined //salt should be automatically generated on save
					});
					newUser.save(function(err, newUser) {
						if (err) {
							console.log('there was an error in creating a new user', err);
							res.send(err);
						} else {
							//need to create a new session for the new user
							res.send('account created')
						}
					})
				} else {
					//account already exists redirect them back to the login page
					res.send('user already exists');
					//res.redirect('whatever the login route is');
				}
			})
		} else {
			res.send('not a valid email address');
		}
	},

	checkIfAnalysisExists: function(req, res) {
		//pull the person and the context out of the req
			//check if there is an analysis for the person and the context
				//if so pull all relavent data and send 
	},

	findAllDataFromAnAnalysis: function(req, res) {
	  var url = req.url.slice(1);
	  Analysis.findOne({_id: url})
	  .exec(function(err, analysis) {
	    if (err) {
	      console.log('there was an error looking up your analysis', err)
	    } else {
	      //use the id of the analysis to query for all rows of the analyses_traits table 
	      AnalysisTrait.find({_id: analysis._id})
	      .exec(function(err, analysisTrait) {
	      	if (err) {
	      		console.log('there was an error looking up the analysisTrait', analysisTrait);
	      	} else {
	      		// use $in in db query
	      		//find all traits corresponding to all the ids obtained from the analysisTrait table
	      		//"bundle" the data and send it to the users
	      	}
	      })
	    }
	  })
	}

}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
