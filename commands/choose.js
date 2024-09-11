const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

  const palavras = args.join(' ').split(',') 

  let resultado = palavras[Math.floor((Math.random() * palavras.length))];

  message.channel.send(resultado)
}