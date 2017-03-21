var db = require('../config');
var mongoose = require('mongoose');

var AnalysesSchema = mongoose.Schema({
	id: Number,
	person: String,
	context: String,
	user_id: Number
})

//when a new analysis is saved
	//get the object id fo the saved analysis
	//send the id as a link along with all the data

var analysis = mongoose.model('analysis', AnalysesSchema);



module.exports = analysis;