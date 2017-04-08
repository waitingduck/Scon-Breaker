'use strict';

const express = require('express');
const proxy = require('express-http-proxy');
const bodyParser = require('dody-parser');
const config = require('./config');
const commands = require('./commands');
const slack = require('slack');

let bot = require('./bot');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => { res.send('Scon Brrrrrrrrrrreakkkkkkkkeeeeeeerrrrrrrr!');});

app.get('/command', commands);

app.post('/actions', function(req, res) {
  if(!req.body || !req.body.payload || JSON.parse(req.body.payload).token != config('INTERACTIVE_TOKEN')) {
    let err = 'Invalid action, Interactive token not match';
    res.status(401).end(err);
    return;
  }
  
  let msg = {
    response_type: 'in_channel',
    username: 'Scon Breaker',
    channle: req.body.channel_name,
    text: 'You choose ' + JSON.parse(req.body.payload).actions[0].value
  };
  
  res.status(200);
  res.set({'content-type': 'application/json'});
  res.send(msg);
});

app.post('/events', function(req, res) {
  if(!req.body || req.body.token != config('INTERACTIVE_TOKEN')) {
    let err = 'Invalid command, Interactive token not match';
    res.status(401).end(err);
    return;
  }
  
  let msg;
  if(req.body && req.body.type === 'url_verification') {
    msg = req.body.challenge;
  } else if(req.body && req.body.type === 'event_callback') {
    if(req.body.event.type === 'link_shared') {
      slack.chat.postMessage({
        token: config('SLACK_BOT_TOKEN'),
        channel: req.body.event.channel,
        username: 'Scon Breaker',
        text: 'Some one just shared a url!'
      }, (err, data) => {
        if(err) throw err;
      });
    }
  }
  
  res.status(200);
  res.set({'content-type': 'application/json'});
  res.send(msg);
});

app.listen(config('PORT'), (err) => {
  if(err) throw err;
  
  console.log(`\n Scon breaker is on port ${config('PORT')} \n`);
  
  if(config('SLACK_BOT_TOKEN')) {
    bot.listen({token: config('SLACK_BOT_TOKEN')});
  }
  
});