var express = require('express');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/', function (req, res) {
  res.send('Hello world');
});

app.listen(3000, function() {
  console.log('Listening on port 3000.');
});