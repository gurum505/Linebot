const line = require('@line/bot-sdk');
const express = require('express');

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

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}


app.listen(3000, function () {
  console.log('Linebot listening on port 3000!');
});
