require('dotenv').config();
const http = require('http');
const { App } = require('@slack/bolt');

const startTime = Date.now();

// Render keep-alive health check
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('GalaxyBot is running.');
}).listen(PORT, () => {
  console.log(`Keep-alive server listening on port ${PORT}`);
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// Ping command
app.command('/dh-ping', async ({ ack, respond }) => {
  await ack();
  await respond({
    response_type: 'in_channel',
    text: `🏓 Pong! Bot is active. Current time: ${new Date().toLocaleTimeString()}`,
  });
});

// Dice roll command
app.command('/dh-dice', async ({ command, ack, respond }) => {
  await ack();
  const input = parseInt(command.text.trim(), 10);
  const sides = !isNaN(input) && input > 1 ? input : 6;
  const result = Math.floor(Math.random() * sides) + 1;

  await respond({
    response_type: 'in_channel',
    text: `🎲 <@${command.user_id}> rolled a d${sides} and got *${result}*!`,
  });
});

// Random developer quote
const devQuotes = [
  "Talk is cheap. Show me the code. — Linus Torvalds",
  "Programs must be written for people to read, and only incidentally for machines to execute. — Harold Abelson",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Simplicity is prerequisite for reliability. — Edsger W. Dijkstra",
  "Make it work, make it right, make it fast. — Kent Beck",
];

app.command('/dh-quote', async ({ command, ack, respond }) => {
  await ack();
  const pick = devQuotes[Math.floor(Math.random() * devQuotes.length)];
  await respond({
    response_type: 'in_channel',
    text: `💡 *Quote:* "${pick}"`,
  });
});

// Uptime tracker
app.command('/dh-uptime', async ({ ack, respond }) => {
  await ack();
  const seconds = Math.floor((Date.now() - startTime) / 1000);
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  await respond({
    response_type: 'in_channel',
    text: `⏱️ GalaxyBot uptime: \`${hrs}h ${mins}m${secs}s\` (Render Container)`,
  });
});

// Help command
app.command('/dh-help', async ({ ack, respond }) => {
  await ack();
  await respond({
    response_type: 'ephemeral',
    text: `*GalaxyBot Commands:*\n` +
          `• \`/dh-ping\` — Check bot latency & status\n` +
          `• \`/dh-dice [sides]\` — Roll a die (default 6, or pass custom like \`/dh-dice 20\`)\n` +
          `• \`/dh-quote\` — Get a random programming quote\n` +
          `• \`/dh-uptime\` — Show how long the bot has been running\n` +
          `• \`/dh-help\` — View this help list`,
  });
});

(async () => {
  await app.start();
  console.log('GalaxyBot connected via Socket Mode.');
})();
