var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/keyboard', function(req, res) {
  const menu = {
    "type": 'buttons',
    "buttons": ["시작"]
  };
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify(menu));
});

app.listen(80, function(){
});
