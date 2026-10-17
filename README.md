# GalaxyBot

A Slack bot built for Hack Club's Stardance challenge. It runs 24/7 on Render and handles slash commands in the Hack Club workspace using Slack's Socket Mode.

## Commands

Here are the 5 slash commands currently supported:

* `/dh-ping` — Checks if the bot is responsive and prints the server timestamp.
* `/dh-dice [sides]` — Rolls a die. Defaults to a standard 6-sided die, or accepts custom sides (for example, `/dh-dice 20`).
* `/dh-quote` — Posts a random developer quote in the channel.
* `/dh-uptime` — Displays how long the bot process has been running continuously.
* `/dh-help` — Shows a quick list of all available commands and how to use them.

## How It Works

* **Node.js & @slack/bolt:** The bot uses Slack's official Bolt framework.
* **Socket Mode:** Instead of exposing public webhooks, the bot connects directly to Slack over WebSockets.
* **Hosting on Render:** The bot runs in a cloud container on Render. Because free instances sleep after 15 minutes of inactivity, I set up a minimal HTTP server inside `index.js` and hooked it to a recurring ping monitor to keep the Socket Mode connection awake 24/7.

## Running Locally

If you want to run this bot yourself:

1. Clone the repo:
   ```bash
   git clone [https://github.com/Dhruvinp07/galaxy-slackbot.git](https://github.com/Dhruvinp07/galaxy-slackbot.git)
   cd galaxy-slackbot
