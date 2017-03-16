var User = require('../../database/models/users');
var Analysis = require('../../database/models/analyses');
var TraitScore = require('../../database/models/analyses_traits');

var analysisId;
var inputType;

var parseProfile = function(params, profile) {
  inputType = params.inputType;

  var analysis = {
    name: params.name,
    context: params.context,
    word_count: profile.word_count,
    user_id: params.userId // get user id from session?
  };

  var newAnalysis = new Analysis(analysis);
  newAnalysis.save(function(err, result) {
    if (err) console.log(err);
    else {
      analysisId = result.id;
    }
  })
  .then(function() {
    var traits = parseTraits(profile.personality);
    traits = traits.concat(parseTraits(profile.needs));
    traits = traits.concat(parseTraits(profile.values));

    // if consumption preferences enabled
    // if (params.inputType === 'JSON') {
    //   traits = traits.concat(parseTraits(profile.behavior));
    // }

    analysis.traits = traits;
  });

  return analysis;
}

var parseTraits = function(category) {
  var traits = [];
  category.forEach((trait) => {
    var traitObj = {
      analysis_id: analysisId,
      trait_id: trait.trait_id,
      percentile: trait.percentile
    };
    if (inputType === 'JSON') {
      traitObj.raw_score = trait.raw_score;
    }
    if (trait.children !== undefined) {
      traits = traits.concat(parseTraits(trait.children));
      delete trait.children;
    }
    var newTrait = new TraitScore(traitObj);
    // newTrait.save(function(err, result) {

    // });
    console.log(traitObj);
    traits.push(trait);
  });
  
  return traits;
}

module.exports.parseProfile = parseProfile;