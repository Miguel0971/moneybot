const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

let argumento = args.join(' ')
if(isNaN(argumento)) return message.channel.send('**Isso não é um número!**')
let roll = Math.random(Math.floor() * argumento) + 1;

message.channel.send(`O resultado é **\`${roll}\`**!`)
}