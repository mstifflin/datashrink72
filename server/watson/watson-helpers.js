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

  // persist anaylsis, set analysisId
  analysisId = 1;

  var traits = [];
  traits = traits.concat(parseTraits(profile.personality));
  traits = traits.concat(parseTraits(profile.needs));
  traits = traits.concat(parseTraits(profile.values));

  // if consumption preferences enabled
  // if (params.inputType === 'JSON') {
  //   traits = traits.concat(parseTraits(profile.behavior));
  // }

  analysis.traits = traits;
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
    traits.push(trait);
  });
  return traits;
}

module.exports.parseProfile = parseProfile;