const line = require('@line/bot-sdk');
const express = require('express');
//papago api
var request = require('request');

//번역 api_url
var translate_api_url = 'https://openapi.naver.com/v1/papago/n2mt';

//언어감지 api_url
var languagedetect_api_url = 'https://openapi.naver.com/v1/papago/detectLangs'

// Naver Auth Key
//새로 발급받은 naver papago api id, pw 입력
var client_id = 'xZMx34y7uru1v8lywZ2d';
var client_secret = 'p6L7M7WsH9';

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'mnny0MJSezgBXzR9C3Ddcc1Csdb7Y9jkvy2nqV5saOmvR2YOJ1/kj/2M0CNsLA+57B2qDpdUQ7WbCTtIKx/LAJ6Kwfop4tX3up7EM8H9EZK1td6GMbhhCb6wvUFVdb1PcTO4joCv8mspd3ubo8a+gAdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'bde77633a16fc5bfbd532d5990c6170e',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  return new Promise(function(resolve, reject) {
        // Naver Papago Translate
        var options = {
            url:  translate_api_url,
            // 한국어(source : ko), 영어(target: en), 카톡에서 받는 메시지(text)
            form: {'source':'ko', 'target':'en', 'text':event.message.text},
            headers: {'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret}
        };

        // Naver Post API
        request.post(options, function(error, response, body){
            // Translate API Sucess
            if(!error && response.statusCode == 200){
                // JSON
                var objBody = JSON.parse(response.body);
                // Message 잘 찍히는지 확인

                const result = { type: 'text', text: objBody.message.result.translatedText};
                console.log(result.text);
                client.replyMessage(event.replyToken,result).then(resolve).catch(reject);
            }
        });
    });
    // use reply API
    //return client.replyMessage(event.replyToken,objBody.message.result.translatedText);
  }



app.listen(3000, function () {
  console.log('Linebot listening on port 3000!');
});
