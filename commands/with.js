const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, args) => {
    
    let member = db.fetch(`${message.author.id}_money`);
    if(member == null) member = 0;

    let bank = db.fetch(`${message.author.id}_money`);
    if(bank == null) bank = 0;
    

    let embed2 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Coloque o valor do saque!`);
  
    if (!args[0]) {
        return message.channel.send(`${message.author}`, embed2);
    };
    let embed4 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Não há essa quantia no seu banco!`);

    if (member < args[0]) {
        return message.channel.send(`${message.author}`, embed4);
    };
    let embed5 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Você tem que colocar um valor maior que **0** para realizar o saque!`);

    if(args[0] < 0) {
        return message.channel.send(`${message.author}`, embed5);
    };
    let embed6 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`Você tem que colocar um valor numérico para realizar o saque!`);

    if (isNaN(args[0])){
        return message.channel.send(`${message.author}`, embed6);
    };
    let embed7 = new Discord.MessageEmbed()
    .setTitle("Saque")
    .setColor("RANDOM")
    .setDescription(`Você sacou do **Banco** um valor de **R$${args[0]}**!`);

    message.channel.send(`${message.author}`, embed7);
    db.add(`${message.author.id}_money`, args[0]);
    db.subtract(`${message.author.id}_bank`, args[0]);
}
