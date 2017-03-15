var db = require('../config');
var mongoose = require('mongoose');

var UsersSchema = mongoose.schema({
	id: Number,
	email: String,
	password: String,
	salt: String
	//date is created automatically as apart of mongodb, accessed by the _id object, should we implement our own date for this?
});

var user = mongoose.model('user', UsersSchema);

module.exports = user;