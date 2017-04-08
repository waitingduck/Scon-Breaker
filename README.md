### Description
Scon Breaker is a sample slack.

### Install
npm install

### Local deploy with Docker
1. Run `npm install localtunnel -g`.
2. Install Docker.
3. Go to [Slack API page](https://api.slack.com/apps).
4. Set up incomming webhook, click "Add new Webhook to Team" and copy webhook URL to chatbot.env.
5. Run `docker-compose up -d`
6. Run `lt --port 3000 --subdomain {YOUR_SUB_DOMAIN}`.

### Logs in Docker
You can monitor your logs by `docker logs -f {YOUR_CONTAINER_NAME}`
