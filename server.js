// Naver WEB Request
var request = require('request');

// Web Package
var express = require('express');
var app = express();

// Kakao Parser
var bodyParser = require('body-parser');

// Naver API URL
var api_url = 'https://openapi.naver.com/v1/papago/n2mt';

// Naver Auth Key
//새로 발급받은 naver papago api id, pw 입력
var client_id = 'xZMx34y7uru1v8lywZ2d';
var client_secret = 'p6L7M7WsH9';

// Parse Application JSON
app.use(bodyParser.json());

// Parse Application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));




// Kakao Keyboard API
app.get('/keyboard', function(req, res) {
  const menu = {
    "type": 'buttons',
    "buttons": ["시작"]
  };
  res.set({
    'content-type': 'application/json'
  }).send(JSON.stringify(menu));
});

// Kakao Message API
app.post('/message', function(req, res) {
  const _obj = {
    user_key: req.body.user_key,
    type: req.body.type,
    content: req.body.content
  };

  console.log(_obj.content)

  // Naver Papago Translate
  var options = {
    url: api_url,
    // 한국어(source : ko), 영어(target: en), 카톡에서 받는 메시지(text)
    form: {'source':'ko', 'target':'en', 'text':req.body.content},
    headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
  };

  // Naver Post API
  request.post(options, function(error, response, body){
    // Translate API Sucess
    if(!error && response.statusCode == 200){
      // JSON
      var objBody = JSON.parse(response.body);
      // Message 잘 찍히는지 확인
      console.log(objBody.message.result.translatedText);

      // Kakao Message API
      let massage = {
        "message": {
          // Naver API Translate 결과를 Kakao Message
          "text": objBody.message.result.translatedText
        },
      };

      // Kakao Message API 전송
      res.set({
        'content-type': 'application/json'
      }).send(JSON.stringify(massage));
    }else{
      // Naver Message Error 발생
      res.status(response.statusCode).end();
      console.log('error = ' + response.statusCode);

      let massage = {
        "message": {
          "text": response.statusCode
        },
      };

      // Kakao에 Error Message
      res.set({
        'content-type': 'application/json'
      }).send(JSON.stringify(massage));
    }
  });
});

// whatsupdevelop.com 실행
app.listen(3000, function(){
});
