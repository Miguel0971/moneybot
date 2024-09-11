const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {
  let role = args[1];
  let argumentos = args[0];
  if(!message.member.permissions.has("MANAGE_CHANNELS")){
            return message.channel.send(":no_entry_sign: | Você não tem permissão para usar este comando!")
        }

        if(!argumentos) message.channel.send(`Preciso que você especifique entre *addping* e *removeping*`)

   if(argumentos === 'addping'){
     if(!role) return;
      const embed = new Discord.MessageEmbed()
      .setTitle(`Cargo adicionado!`)
      .setDescription(`Agora todas as sugestões nesse servidor serão pingadas com o cargo ${role}`)
      message.channel.send(embed)

      db.set(`cargo_${message.guild.id}`, role)
   }
   if(argumentos === 'removeping'){
     const embed = new Discord.MessageEmbed()
     .setTitle(`Cargo retirado!`)
     .setDescription(`Agora não será mais mencionado nas sugestões`)
     message.channel.send(embed)
     db.delete(`cargo_${message.guild.id}`)
   }
}