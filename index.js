require('dotenv').config();
const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// 1. /dh-ping : Latency & Bot Status check
app.command('/dh-ping', async ({ command, ack, respond }) => {
  await ack();
  await respond({
    response_type: 'in_channel',
    text: `🏓 *Pong!* GalaxyBot is online and responsive.\n⏱️ *Timestamp:* ${new Date().toLocaleTimeString()}`,
  });
});

// 2. /dh-dice : Roll a dice (e.g., /dh-dice or /dh-dice 20)
app.command('/dh-dice', async ({ command, ack, respond }) => {
  await ack();

  let sides = 6;
  const parsed = parseInt(command.text.trim(), 10);
  if (!isNaN(parsed) && parsed > 1) {
    sides = parsed;
  }

  const roll = Math.floor(Math.random() * sides) + 1;

  await respond({
    response_type: 'in_channel',
    text: `🎲 <@${command.user_id}> rolled a *d${sides}* and got: *${roll}*!`,
  });
});

// 3. /dh-quote : Random developer quote
const quotes = [
  "\"Programs must be written for people to read, and only incidentally for machines to execute.\" — Harold Abelson",
  "\"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.\" — Martin Fowler",
  "\"First, solve the problem. Then, write the code.\" — John Johnson",
  "\"Experience is the name everyone gives to their mistakes.\" — Oscar Wilde",
  "\"Code is like humor. When you have to explain it, it’s bad.\" — Cory House",
  "\"Simplicity is prerequisite for reliability.\" — Edsger W. Dijkstra"
];

app.command('/dh-quote', async ({ command, ack, respond }) => {
  await ack();
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  await respond({
    response_type: 'in_channel',
    text: `💡 *Dev Quote for <@${command.user_id}>:*\n> ${randomQuote}`,
  });
});

(async () => {
  await app.start();
  console.log('⚡️ GalaxyBot is connected and listening via Socket Mode!');
})();