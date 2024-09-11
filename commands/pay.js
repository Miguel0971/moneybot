const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
    
    let user = message.mentions.members.first() 

    let member = db.fetch(`${message.author.id}_money`)

    let embed1 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`🚫 **|** Mencione alguem para pagar!`);

    if (!user) {
        return message.channel.send(`${message.author}`, embed1)
    }
    let embed2 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`🚫 **|** Coloque o valor do pagamento!`);
  
    if (!args[1]) {
        return message.channel.send(`${message.author}`, embed2);
    }
    let embed4 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`🚫 **|** Você não Dinheiro suficiente para realizar o pagamento!`);

    if (member < args[1]) {
        return message.channel.send(`${message.author}`, embed4)
    }
    let embed5 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`🚫 **|** Você tem que colocar um valor maior que **0** para realizar o pagamento!`);

    if(args[1] < 0) {
        return message.channel.send(`${message.author}`, embed5)
    }
    let embed7 = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`🚫 **|** Você tem que colocar um valor numerico para realizar o pagamento!`);

    if (isNaN(args[1])){
        return message.channel.send(`${message.author}`, embed7)
    }
    let embed6 = new Discord.MessageEmbed()
    .setTitle(":coin: **|** Pagamento")
    .setColor("RANDOM")
    .setDescription(`:coin: Você pagou o ${user} com **R$${args[1]}**!`);

    message.channel.send(`${message.author}`, embed6)
    db.add(`${user.id}_money`, args[1])
    db.subtract(`${message.author.id}_money`, args[1])
}