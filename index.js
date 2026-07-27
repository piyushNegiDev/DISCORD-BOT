import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { URL } from "./models/urls.js";
import { connectToMongoDB } from "./connect.js";
import shortid from "shortid";

connectToMongoDB("mongodb://localhost:27017/discordBotDB").then(() => {
  return console.log("MongoDB Connected!");
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("interactionCreate", (interaction) => {
  console.log(interaction);
  interaction.reply("Pong!!");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const redirectURL = message.content.split("create")[1];

    const shortId = shortid();

    const newUrl = await URL.create({
      redirectURL,
      shortId,
    });

    await message.reply({
      content: `Your short URL is: http://localhost:8000/${newUrl.shortId}`,
    });
  }

  console.log(message.content);
  message.reply({ content: "Hi From Bot" });
});

client.login(process.env.BOT_TOKEN);
