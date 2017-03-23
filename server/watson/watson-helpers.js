var User = require('../../database/models/users');
var Analysis = require('../../database/models/analyses');
var TraitScore = require('../../database/models/analyses_traits');

var analysisId;
var inputType;

var parseProfile = function(params, profile) {
  return new Promise(function(resolve, reject) {
    inputType = params.inputType;

    var analysis = {
      person: params.name,
      context: params.context,
      word_count: profile.word_count,
      user_id: params.userId // get user id from session?
    };

    var newAnalysis = new Analysis(analysis);
    newAnalysis.save(function(err, result) {
      if (err) reject(err);
      else {
        analysisId = result.id;
        Promise.all([parseTraits(profile.personality), 
          parseTraits(profile.needs), 
          parseTraits(profile.values)])
        .then(function() {
          resolve(analysisId);
        })
      }
    });
  });
}

var parseTraits = function(category) {
  return new Promise(function(resolve, reject) {
    category.forEach((trait) => {
      var traitObj = {
        analysis_id: analysisId,
        trait_id: trait.trait_id,
        name: trait.name,
        category: trait.category,
        percentile: trait.percentile
      };
      if (inputType === 'JSON') {
        traitObj.raw_score = trait.raw_score;
      }
      if (trait.children !== undefined) {
        parseTraits(trait.children).then(function() {
          delete trait.children;
        });
      }
      var newTrait = new TraitScore(traitObj);
      newTrait.save(function(err, result) {
        if (err) reject(err);
      });
    });
    resolve();
  });
}

module.exports.parseProfile = parseProfile;