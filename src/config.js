const dotenv = require('dotenv');
const ENV = process.env.NODE_ENV || 'development';

if (ENV === 'development') dotenv.load();

const config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  PROXY_URI: process.env.PROXY_URI,
  WEBHOOK_URL: process.env.WEBHOOK_URL,
  COMMAND_TOKEN: process.env.COMMAND_TOKEN,
  SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN,
  INTERACTIVE_TOKEN: process.env.INTERACTIVE_TOKEN
};

module.exports = (key) => {
  if (!key) return config;

  return config[key];
};
