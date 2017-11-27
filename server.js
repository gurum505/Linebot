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

app.post('/message', function(req, res) {
  const _obj = {
    user_key: req.body.user_key,
    type: req.body.type,
    content: req.body.content
  };

  console.log(_obj.content)
  
  let massage = {
    "message": {
      "text": _obj.content 
    },
  };
      
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify(massage));
});

app.listen(80, function(){
});
