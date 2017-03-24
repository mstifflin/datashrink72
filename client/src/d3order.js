module.exports = function(data) {
  var order = { Adventurousness: 0,
  'Artistic interests': 1,
  Emotionality: 2,
  Imagination: 3,
  Intellect: 4,
  'Authority-challenging': 5,
  Openness: 6,
  'Achievement striving': 7,
  Cautiousness: 8,
  Dutifulness: 9,
  Orderliness: 10,
  'Self-discipline': 11,
  'Self-efficacy': 12,
  Conscientiousness: 13,
  'Activity level': 14,
  Assertiveness: 15,
  Cheerfulness: 16,
  'Excitement-seeking': 17,
  Outgoing: 18,
  Gregariousness: 19,
  Extraversion: 20,
  Altruism: 21,
  Cooperation: 22,
  Modesty: 23,
  Uncompromising: 24,
  Sympathy: 25,
  Trust: 26,
  Agreeableness: 27,
  Fiery: 28,
  'Prone to worry': 29,
  Melancholy: 30,
  Immoderation: 31,
  'Self-consciousness': 32,
  'Susceptible to stress': 33,
  'Emotional range': 34,
  Challenge: 35,
  Closeness: 36,
  Curiosity: 37,
  Excitement: 38,
  Harmony: 39,
  Ideal: 40,
  Liberty: 41,
  Love: 42,
  Practicality: 43,
  'Self-expression': 44,
  Stability: 45,
  Structure: 46,
  Conservation: 47,
  'Openness to change': 48,
  Hedonism: 49,
  'Self-enhancement': 50,
  'Self-transcendence': 51 }

  var ordered = [];
  
  data.forEach(e => {
    var index = order[e.name];
    ordered[index] = e;
  });

  return ordered;
}