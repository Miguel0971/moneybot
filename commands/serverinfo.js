  
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "server-info",
    category: "extra",
    run: async (client, message, args) => {
    var list = [
      'https://thumbs.gfycat.com/EminentFortunateGartersnake-small.gif',
      'https://thumbs.gfycat.com/AcclaimedHilariousIbisbill-small.gif',
      'https://thumbs.gfycat.com/ExaltedKeenAustralianshelduck-size_restricted.gif',
      'https://thumbs.gfycat.com/UnfoldedYearlyBarasingha-size_restricted.gif',
      'https://data.whicdn.com/images/176568618/original.gif',
      'https://33.media.tumblr.com/77830132567e75cebd56ae685a92a844/tumblr_nns6lksq1U1rmzw91o1_540.gif'
    ];

    var rand = list[Math.floor(Math.random() * list.length)];
client.users.cache.get(args[0]);


        const embed = new MessageEmbed()
            .setThumbnail(rand)
            .setColor('RANDOM')
            .setTitle(`Informação do Servidor ${message.guild.name}`)
            .addFields(
                {
                    name: "Dono(a): ",
                    value: message.guild.owner.user.tag,
                    inline: true
                },
                {
                    name: "Membros: ",
                    value: `${message.guild.memberCount} membrozins`,
                    inline: true
                },
                {
                    name: "Membros Online: ",
                    value: ` ${message.guild.members.cache.filter(m => m.user.presence.status == "online").size} membrozins online`,
                    inline: true
                },
                {
                    name: "Bots: ",
                    value: ` ${message.guild.members.cache.filter(m => m.user.bot).size} BOT's!`,
                    inline: true
                },
                {
                    name: "Servidor criado dia: ",
                    value: message.guild.createdAt.toLocaleDateString("en-us"),
                    inline: true
                },
                {
                    name: "Cargos: ",
                    value: `${message.guild.roles.cache.size} Cargos.`,
                    inline: true,
                },
             
                {
                    name: `Verificado: `,
                    value: message.guild.verified ? 'Servidor verificado' : `Servidor não verificado`,
                    inline: true
                },
                {
                    name: 'Boost: ',
                    value: message.guild.premiumSubscriptionCount >= 1 ? `${message.guild.premiumSubscriptionCount} Boosts` : `Não tem boosts`,
                    inline: true
                },
                {
                    name: "Emojis: ",
                    value: message.guild.emojis.cache.size >= 1 ? `${message.guild.emojis.cache.size} emojis!` : 'Não tem emojis' ,
                    inline: true
                }
            )
            .setImage(message.guild.iconURL({dynamic : true}))
        await message.channel.send(embed)
    }
}