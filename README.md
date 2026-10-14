# 🌌 GalaxyBot

A 24/7 Slack bot built for the Hack Club community as part of the **Stardance** project. GalaxyBot is powered by Node.js, `@slack/bolt`, and Slack Socket Mode, deployed on cloud infrastructure.

## ✨ Features & Slash Commands

| Command | Description | Example |
| :--- | :--- | :--- |
| `/dh-ping` | Tests bot latency and verifies real-time status | `/dh-ping` |
| `/dh-dice [sides]` | Rolls a randomized dice (default: 6, or custom sides) | `/dh-dice 20` |
| `/dh-quote` | Returns an inspirational computer science / dev quote | `/dh-quote` |

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** `@slack/bolt`
- **Protocol:** Slack Socket Mode
- **Hosting:** Render (with 24/7 keep-alive monitor)

## 🚀 Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Dhruvinp07/galaxy-slackbot.git](https://github.com/Dhruvinp07/galaxy-slackbot.git)
   cd galaxy-slackbot
Install dependencies:

Bash
npm install
Configure environment variables:
Create a .env file in the root directory:

Code snippet
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_APP_TOKEN=xapp-your-app-token
Start the bot:

Bash
node index.js

---

<Steps>
  <Step subtitle="1 min" title="Add README.md to Your Repo">
    1. Go to `[https://github.com/Dhruvinp07/galaxy-slackbot](https://github.com/Dhruvinp07/galaxy-slackbot)`.
    2. Click **Add file** -> **Create new file**.
    3. Name the file `README.md`.
    4. Paste the Markdown template above into the editor.
    5. Click the green **Commit changes...** button at the top right.

    *Verification:* Visit your repository homepage; the formatted documentation now displays under the file tree.
  </Step>

  <Step subtitle="2 min" title="Submit to Stardance">
    When filling out your Stardance project submission form, include:
    * **Project Name:** GalaxyBot
    * **GitHub Repository URL:** `[https://github.com/Dhruvinp07/galaxy-slackbot](https://github.com/Dhruvinp07/galaxy-slackbot)`
    * **Slash Commands to Test:** `/dh-ping`, `/dh-dice`, `/dh-quote`
    * **Uptime/Deployment:** Hosted 24/7 on Render via Socket Mode

    *Verification:* Submit the form and verify your project appears in the review queue.
  </Step>
</Steps>

<Elicitations message="What would you like to work on next?">
  <Elicitation label="Add more bot commands" query="I want to add another slash command or an event listener (like replying to mentions) to GalaxyBot."/>
  <Elicitation label="Migrate to Nest later" query="When my Hack Club Nest container is approved, how do I migrate GalaxyBot from Render to Nest?"/>
</Elicitations>
