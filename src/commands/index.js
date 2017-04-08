'use strict';

const express = require('express');
const router = express.Router();
const config = require('../config');

router.use(function auth (req, res, next) {
  if(!req.body || req.body.token != config('COMMAND_TOKEN')) {
    let err = 'Invalid command, COMMAND_TOKEN not match';
    res.status(401).end(err);
    return;
  }
  next();
});

router.post('/sconbreaker', (req, res) => {
  let msg ={
    response_type: 'in_channel',
    username: 'Scon Breaker',
    channel: req.body.channel_name,
    text: 'I break a scon!'
  };
  
  res.status(200);
  res.set({'content_type': 'application/json'});
  res.send(msg);
});

module.exports = router;