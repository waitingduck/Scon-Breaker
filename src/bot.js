'use strict';

const slack = require('slack');
const _ = require('lodash');
const config = require('./config');

let bot = slack.rtm.client();

bot.started((payload) => {
  this.self = payload.self;
});

bot.message((msg) => {
  if (!msg.user) return;
  if (!_.includes(msg.text.match(/<@([A-Z0-9])+>/igm), `<@${this.self.id}>`)) return;

  slack.chat.postMessage({
    token: config('SLACK_BOT_TOKEN'),
    channel: msg.channel,
    username: 'Scon Breaker',
    text: `I break a scon!!!!"`
  }, (err, data) => {
    if (err) throw err;
  });
});

module.exports = bot;
