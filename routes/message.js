var express = require('express');
var request = require('request');
var app = express.Router();

// Naver Auth Key
var client_id = '86rKmat0DijccSxKa01P';
var client_secret = 'rMapNjB8DP';

// Naver API URL
var api_url = 'https://openapi.naver.com/v1/papago/n2mt';

// Kakao Message API
app.post('/', function(req, res) {
  const _obj = {
    user_key: req.body.user_key,
    type: req.body.type,
    content: req.body.content
  };

  if(_obj.content.charAt(0) == '/'){
    if(_obj.content == '/설정'){
      res.set('content-type', 'application/json');
      res.json({
        "message": {
          "text": "언어를 선택하세요"
        },
        "keyboard": {
          "type": "buttons",
          "buttons": [
            "/한국어 -> 영어",
            "/한국어 -> 일본어",
            "/한국어 -> 중국어",
            "/영어 -> 한국어",
            "/일본어 -> 한국어",
            "/중국어 -> 한국어"
          ]
        }
      });
    }else if(_obj.content == '/시작'){
      res.json({
        "message": {
          "text": "언어를 설정하고 싶으면 /설정 이라고 타이핑 해주세요"
        },
        "keyboard": {
          "type": "text"
        }
      });
    }else if((obj.content == '/한국어 -> 영어') ||
             (obj.content == '/한국어 -> 일본어') ||
             (obj.content == '/한국어 -> 중국어') ||
             (obj.content == '/영어 -> 한국어') ||
             (obj.content == '/일본어 -> 한국어')||
             (obj.content == '중국어 -> 한국어')){
               var s1 = choiceLanguage(content.split("/")[1].split("->")[0]);
               var t1 = choiceLanguage(content.split("/")[1].split("->")[1]);
               var options = {
                 url: api_url,
                 // 한국어(source : ko), 영어(target: en), 카톡에서 받는 메시지(text)
                 form: {'source':s1, 'target':t1, 'text':req.body.content},
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
      }else{
        res.set('content-type', 'application/json');
        res.json({
          "message": {
            "text": "/기호가 들어간 명령어는 사용할 수 없습니다."
          }
        });
      }
    }else{
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
    }
});

function choiceLanguage(str) {
    if (str == "영어")
        return "en";
    else if (str == "한국어") {
        console.log(str);
        return "ko";
    }
    else if (str == "일본어")
        return "ja";
    else if (str == "중국어(간체)")
        return "zh-CN";
    else
        return "ko";
}

module.exports = app;
