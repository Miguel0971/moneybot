const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); 

require('dotenv').config();
const Discord = require("discord.js");
const fs = require("fs");
const config = require('./config.json');
const discord = require('discord.js');
const client = new discord.Client({
	autoReconnect: true,
	partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "REACTION", "MESSAGE", "USER"]
});

client.config = require("./config.json")
client.emotes = config.emoji;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.config = config;


client.aliases = new Discord.Collection();  

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`✅ | ${commandName}  ✅ `);
    client.commands.set(commandName, props);
  });
});

client.on("ready", () => {
  let activities = [
      `Extravagante`,
      `Luar de Sangue`,
      `Vamos comemorar`
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
      }), 1000 * 60);
  client.user
console.log(`Estou Online com ${client.user.tag}`)
});

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

client.login('SEU TOKEN AQUI');