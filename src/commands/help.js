const _ = require('lodash');
const config = require('../config');

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Starbot',
  icon_emoji: config('ICON_EMOJI')
};

let attachments = [
  {
    title: 'Scon breakerrrrrrrrrrr!',
    color: '#2FA44F',
    text: 'Scon breaker can break a scon!!!!',
    mrkdwn_in: ['text']
  }
];

const handler = (payload, res) => {
  let msg = _.defaults({
    channel: payload.channel_name,
    attachments: attachments
  }, msgDefaults);

  res.set('content-type', 'application/json');
  res.status(200).json(msg);
  return;
};

module.exports = { pattern: /help/ig, handler: handler };
