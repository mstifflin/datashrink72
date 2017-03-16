var db = require('../config');
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

var AnalysesTraitsSchema = mongoose.Schema({
	analysis_id: String,
	trait_id: String,
	raw_score: SchemaTypes.Double,
	percentile: SchemaTypes.Double
});

var analysis_trait = mongoose.model('analysis_trait', AnalysesTraitsSchema);

module.exports = analysis_trait;