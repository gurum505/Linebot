var express = require('express');
const request = require('request');
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TOKEN = '2COGs98oPL/IUlCY23t4YMh98apwu0w2wlCWMjTvpNpHZwJoMWpYJP2/S00b/bwCKRTK0D9zgLbQq0gLokge0cXHb5gCJ6UQBTV4KHiynPN/WKydHNxqAwGlzvN+YUJoP9VG/crGAfy5xaU7k2EANAdB04t89/1O/w1cDnyilFU='
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = "www.chatbot-test.ml"
const sslport = 23023;
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.post('/hook', function (req, res) {

    var eventObj = req.body.events[0];
    var source = eventObj.source;
    var message = eventObj.message;

    // request log
    console.log('======================', new Date() ,'======================');
    console.log('[request]', req.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message['text']);


    
    var AWS = require("aws-sdk");
    AWS.config.update({region:'us-east-1'});
    var params={LanguageCode:'en',TextList:[eventObj.message['text']]};
    var comprehend = new AWS.Comprehend();
    comprehend.batchDetectSentiment(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     {console.log(data.ResultList[0]['Sentiment']);
                  send(eventObj.replyToken,data.ResultList[0]['Sentiment'])
                }          // successful response
    });

    res.sendStatus(200);
});

function send(replyToken,result){
    request.post(
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken":replyToken,
                "messages":[
                    {
                        "type":"text",
                        "text":"what can I help you?"
                    },
                    {
                        "type":"text",
                        "text":"you look"+result
                    }
                ]
            }
        },(error, response, body) => {
            console.log(body)
        });
}


try {
    const option = {
      ca: fs.readFileSync('/etc/letsencrypt/live/' + domain +'/fullchain.pem'),
      key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/privkey.pem'), 'utf8').toString(),
      cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/cert.pem'), 'utf8').toString(),
    };
  
    HTTPS.createServer(option, app).listen(sslport, () => {
      console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
  } catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
  }
  
