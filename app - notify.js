const request = require('request');
// 요청을 위한 상수를 선언합니다: TOKEN은 자신의 것을 입력해주세요.
const TARGET_URL = 'https://notify-api.line.me/api/notify';
const TOKEN = 'Kyu6Mp5GjB1afXWjKPqFdhdBxDicsxGBPrWp9s6JuxS';



/// 아래는 replytoken이 필요해 사용할수 없었습니다
//const CHANNEL_TOKEN
//const line = require('@line/bot-sdk');
//const client = new line.Client({
//    channelAccessToken: CHANNEL_TOKEN
//  });
//const message = {
//    type: 'text',
//    text: 'Hello World!'
//  };
//  client.replyMessage('<replyToken>', message);
  //replytoken webhook
///

    var result;
    var AWS = require("aws-sdk");
    AWS.config.update({region:'us-east-1'});
    var params={LanguageCode:'en',TextList:['this is english']};
    var comprehend = new AWS.Comprehend();
    comprehend.batchDetectSentiment(params, function (err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     {console.log(data.ResultList[0]);
                  result=data.ResultList[0];
                  send(result['Sentiment']);
                }          // successful response
    });
    


    

function send(result){
    request.post(
    
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            form: {
                message: result,
                stickerPackageId: 1,
                stickerId: 1
            }
        },(error, response, body) => {
            console.log(body)
        });
}