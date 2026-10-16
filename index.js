require('dotenv').config();
const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

const startTime = Date.now();

function getUptime() {
  const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
}

// 1. /dh-ping : This command checks the bot's latency and onlne status. It responds with a "Pong" message along with the current timestamp.
app.command('/dh-ping', async ({ command, ack, respond }) => {
  await ack();
  await respond({
    response_type: 'in_channel',
    text: `🏓 *Pong!* GalaxyBot is online and responsive.\n⏱️ *Timestamp:* ${new Date().toLocaleTimeString()}`,
  });
});

// 2. /dh-dice : This command rolls a die with a specified number of slides (default is 6). User can specify th number of slides by providing a number often the command (e.g., /dh-dice 20). The bot will return a random number between 1 and the specified number of slides.
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

// 3. /dh-quote : This command reuturns a random programming quote from a predefined list of quotes.
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

// 4. /dh-uptime : This command checks the bot's uptime and returns it in a human readable format along with the host information.
app.command('/dh-uptime', async ({ command, ack, respond }) => {
  await ack();
  await respond({
    response_type: 'in_channel',
    text: `⏱️ *GalaxyBot Uptime:* \`${getUptime()}\`\n🚀 *Host:* Render Cloud Container`,
  });
});

// 5. /dh-help : This command provide a list of all available commands and their descriptions in chat.
app.command('/dh-help', async ({ command, ack, respond }) => {
  await ack();
  await respond({
    response_type: 'ephemeral',
    text: `🌌 *GalaxyBot Command Directory:*\n` +
          `• \`/dh-ping\` — Check bot latency and online status\n` +
          `• \`/dh-dice [sides]\` — Roll a die (e.g., \`/dh-dice 20\`)\n` +
          `• \`/dh-quote\` — Get an inspirational programming quote\n` +
          `• \`/dh-uptime\` — Check current bot uptime\n` +
          `• \`/dh-help\` — Display this menu`,
  });
});

(async () => {
  await app.start();
  console.log('⚡️ GalaxyBot is connected and listening via Socket Mode!');
})();
