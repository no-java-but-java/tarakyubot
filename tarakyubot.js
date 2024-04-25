const { app, receiver } = require('./appConfig.js');
const { handleMessage } = require('./chatGpt.js'); // chatGPT
const { handleCommand } = require('./bamboo'); // 대나무숲

exports.handle = (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Only POST requests are accepted');
    return;
  }
  receiver.app(req, res);
};

app.message(/^!gpt/, async ({ message, say }) => {
  await say('기다려봐ㅎ');
  const response = await handleMessage(message);
  await say(response);
});

app.command('/대나무숲', async ({ command, ack, respond }) => {
  await ack();
  const response = await handleCommand(command);
  await respond({ response_type: 'in_channel', text: response });
});

