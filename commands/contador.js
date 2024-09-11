
const { MessageEmbed } = require("discord.js")
const fs = require("fs")

exports.run = async (bot, message, args) => {

  const palavras = args.join(' ').split('') 

  let resultado = palavras.length

  message.channel.send(resultado)
}