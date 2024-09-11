const Discord = require('discord.js');
const config = require('./../config.json')

module.exports.run = async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setTitle(`Informação`)
    .setDescription(`Estou em ${client.guilds.cache.size} servidores!
    Contendo ${client.channels.cache.size} canais no total!
    E ${client.users.cache.size} membros/usuários!
    
    Caso precise, utilize ${config.prefix}help para obter ajuda`)
    let msg = await message.channel.send(embed);
  msg.react('<a:Fortnitedance:755097979852947627>');
  };
