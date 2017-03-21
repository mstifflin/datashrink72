var User = require('../../database/models/users');
var Analysis = require('../../database/models/analyses');
var TraitScore = require('../../database/models/analyses_traits');

var analysisId;
var inputType;

var parseProfile = function(params, profile) {
  return new Promise(function(resolve, reject) {
    inputType = params.inputType;

    var analysis = {
      name: params.name,
      context: params.context,
      word_count: profile.word_count,
      user_id: params.userId // get user id from session?
    };

    var newAnalysis = new Analysis(analysis);
    newAnalysis.save(function(err, result) {
      if (err) reject(err);
      else {
        analysisId = result.id;
        console.log('saved', result);
        // var traits = parseTraits(profile.personality, result);
        // traits = traits.concat(parseTraits(profile.needs, result));
        // traits = traits.concat(parseTraits(profile.values, result));
        parseTraits(profile.personality, result);
        parseTraits(profile.needs, result);
        parseTraits(profile.values, result);
      }
    })
    .then(function() {

      // var traits = [parseTraits(profile.personality)];
      // traits.push((parseTraits(profile.needs)));
      // traits.push((parseTraits(profile.values)));

      // Promise.all(traits).then(function(output) {
      //   console.log('promisified traits', output);

      //   resolve(output);
      // })
      // .then(function(traitList) {

      // })
      // .catch(function(error) {
      //   console.log(error);
      //   reject(error);
      // })

      // if consumption preferences enabled
      // if (params.inputType === 'JSON') {
      //   traits = traits.concat(parseTraits(profile.behavior));
      // }

      // analysis.traits = traits;
      resolve(analysis);
    })
    .catch(function(error) {
      reject(error);
    });
    
  })

}

var parseTraits = function(category, analysis) {
  // return new Promise(function(resolve, reject) {
    console.log('passed analysis', analysis);
    var traits = [];
    category.forEach((trait) => {
      var traitObj = {
        // analysis_id: analysisId,
        trait_id: trait.trait_id,
        name: trait.name,
        category: trait.category,
        percentile: trait.percentile
      };
      if (inputType === 'JSON') {
        traitObj.raw_score = trait.raw_score;
      }
      if (trait.children !== undefined) {
        traits = traits.concat(parseTraits(trait.children, analysis));
        delete trait.children;
      }
      var newTrait = new TraitScore(traitObj);
      newTrait.save(function(err, result) {
        if (err) console.log(err);
        else {
          analysis.traits.push(newTrait);
          analysis.save(function(err) {
            if (err) console.log(err);
          });
        }
      });
      traits.push(traitObj);
    });
    // analysis.traits = analysis.traits.concat(traits);
    return traits;
    // resolve(traits);
  // });
}

module.exports.parseProfile = parseProfile;