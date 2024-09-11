const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

exports.run = async (bot, message, args) => {
  
    let user = message.author;
    let quantia = await db.get(`peixes_${message.author.id}`)
    let quant = await db.get(`${user.id}_money`)


    let argumentos = args.join(' ');

    if(!argumentos){
      const mandar = new Discord.MessageEmbed()
    .setTitle(`Vender!`)
    .addFields({
      name: `Peixes:`,
      value: `$20 Cada`
    })
    message.channel.send(mandar)
    }



    if(argumentos === 'peixes'){
      const embed = new Discord.MessageEmbed()
      .setTitle(`Quantos peixes você irá vender?`)
      .setDescription(`Lembre-se, você ganha $20 por peixe!`)
      message.channel.send(embed).then(msg => {
    message.channel.createMessageCollector(a => a.author.id === message.author.id, { max: 1 })
    .on('collect', a => {

    let argumentos1 = a.content
    if(isNaN(argumentos1)) return message.channel.send('Por favor, informe uma quantia válida!')

    db.subtract(`peixes_${message.author.id}`, argumentos1)

    let vendido = 20 * argumentos1;

    db.add(`${user.id}_money`, vendido)
    const vendidoooo = new Discord.MessageEmbed()

    .setTitle(`Venda`)
    .setDescription(`Você vendeu **${argumentos1}** de peixes por **$${vendido}**!`)
    message.channel.send(vendidoooo)
    
    
    })
      })
    }


}