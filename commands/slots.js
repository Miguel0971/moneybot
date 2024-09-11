const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");

const slotItems = ["🍇", "🍉", "🍌", "🍎", "🍒"];

  exports.run = async (client, message, args) => {
  
    let user = message.author;
    let moneydb = await db.fetch(`${user.id}_money`)
    let money = parseInt(args[0]);
    let win = false;
    

    let moneymore = new Discord.MessageEmbed()
    .setColor("#6400b6")
    .setDescription(`<:IconOutage:781014184887975936> **|** Você não tem tudo isso`);

    let moneyhelp = new Discord.MessageEmbed()
    .setColor("#6400b6")
    .setDescription(`<:IconOutage:781014184887975936> **|** Coloque um valor`);

    if (!money) return message.channel.send(moneyhelp);
    if (money > moneydb) return message.channel.send(moneymore);

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 3
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nVocê ganhou ${money} 💵`)
            .setColor("#6400b6")
        message.channel.send(slotsEmbed1)
        db.add(`${user.id}_money`, money)
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nvocê perdeu ${money} 💵`)
            .setColor("#6400b6")
        message.channel.send(slotsEmbed)
        db.subtract(`${user.id}_money`, money)
    }
  }

