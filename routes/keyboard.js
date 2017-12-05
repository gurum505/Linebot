var express = require('express');
var app = express.Router();

// Kakao Keyboard API
app.get('/', function(req, res) {
  const menu = {
    "type": 'buttons',
    "buttons": ["/설정", "/시작"]};

  res.status(200).set({
    'content-type': 'application/json'
  }).send(JSON.stringify(menu));
});


module.exports = app;

