const express = require('express');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const _ = require('lodash');
const config = require('./config');
const commands = require('./commands');
const helpCommand = require('./commands/help');

let bot = require('./bot');

let app = express();

if (config('PROXY_URI')) {
  app.use(proxy(config('PROXY_URI'), {
    forwardPath: (req, res) => { return require('url').parse(req.url).path }
  }));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => { res.send('Scon BBBBBBBBBBBBBreakerrrrrrrrrrrrrrrr') });

app.post('/commands/breakscon', (req, res) => {
  let payload = req.body;

  if (!payload || payload.token !== config('COMMAND_TOKEN')) {
    let err = 'Something is wrong with your command?';
    console.log(err);
    res.status(401).end(err);
    return;
  }

  let cmd = _.reduce(commands, (a, cmd) => {
    return payload.text.match(cmd.pattern) ? cmd : a
  }, helpCommand);

  cmd.handler(payload, res);
});

app.listen(config('PORT'), (err) => {
  if (err) throw err;

  console.log('Scon Breaker is live on port 3000!');

  if (config('BOT_TOKEN')) {
    console.log('Scon Breaker is real time now!');
    bot.listen({ token: config('BOT_TOKEN') });
  }
});
