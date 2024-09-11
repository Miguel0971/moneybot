const db = require('quick.db') 
const {MessageEmbed, discord} = require('discord.js')
const config = require('./../config.json')

    exports.run = async (bot, message, args) => {
        let avatar = message.author.avatarURL({ dynamic: true, format: "gif", size: 1024 });

        const content = args.join(" ");

        let cargo = db.fetch(`cargo_${message.guild.id}`)
        if(!cargo) cargo = 'Sem cargo adicionado'

        var channel = message.guild.channels.cache.get(db.fetch(`suggestchan_${message.guild.id}`))
        if(channel==null){
            return message.channel.send(`Não há uma configuração de canal de sugestão definido. Para definir o canal use ${config.prefix}setsugerir <mencione o canal ou use o id>!`)
        }
        var embed = new MessageEmbed()
            
            .setTitle(`Sugestao dada por: ${message.author.tag}!`)
            .setThumbnail(avatar)
            .setDescription(`Sugestao: ${content}`)
            .setColor("RANDOM")
            .setFooter(`ID: ${message.author.id}.`)
           
        
        let m = await channel.send(`${cargo}`, embed)

        channel.messages.fetch(m.id).then(msg => {
        msg.react('👍').then(r => {
        msg.react('👎').then(r => {
            })
          })  
        })
        message.channel.send(`✅ | Sua sugestão foi enviada para o canal <#${channel.id}>.`)
        message.delete()
        
        .catch((err)=>{
            console.log(err)
        })


    }