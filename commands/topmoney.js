const { MessageEmbed } = require("discord.js");
const db = require('quick.db');;

  exports.run = async (client, message, args) => {
    let user = message.mentions.users.first || message.author;
        let money = db.all().filter(lb => lb.ID.startsWith(`${user.id}_money`)).sort((a, b) => b.data- a.data)
        let bankBalance = money.slice(0, 10)
        console.log(bankBalance)
        let content = " ";

        for(let i = 0; i < bankBalance.length; i++) {
            let user2 = client.users.cache.get(bankBalance[i].ID.split('_')[2])

            content += `${i+1}. ${user2} - \$${bankBalance[i].data} \n`

        }

        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`${message.guild.name}\'RANK`)
        .setDescription(`** ${content} **`)
        .setTimestamp()

        message.channel.send(embed)
    }