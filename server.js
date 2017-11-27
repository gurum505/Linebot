var request = require('request');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var api_url = 'https://openapi.naver.com/v1/papago/n2mt';

var client_id = '86rKmat0DijccSxKa01P';
var client_secret = 'rMapNjB8DP';
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

  var options = {
    url: api_url,
    form: {'source':'ko', 'target':'en', 'text':req.body.content},
    headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
  };
  request.post(options, function(error, response, body){
    if(!error && response.statusCode == 200){
      var objBody = JSON.parse(response.body);
      console.log(objBody.message.result.translatedText);
  
      let massage = {
        "message": {
          "text": objBody.message.result.translatedText 
        },
      };
      
      res.set({
        'content-type': 'application/json'
      }).send(JSON.stringify(massage));
    }else{
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);

      let massage = {
        "message": {
          "text": response.statusCode
        },
      };

      res.set({
        'content-type': 'application/json'
      }).send(JSON.stringify(massage));
    }
  });
});

app.listen(80, function(){
});
