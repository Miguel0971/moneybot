const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (client, message, args) => {
    
    if (!['SEU ID'].includes(message.author.id))
    return message.reply(
      "Apenas meu dono pode usar esse comando!E deixar claro que ele só usa em ocasiões especiais como em eventos, Desculpa! 💖"
    );

    let user = message.mentions.users.first() || message.author;

    if (!user) {
        return message.channel.send(`🚫 **|** ${message.author}, você precisa mencionar um usuário para remover o Dinheiro!`);
    };

    if (isNaN(args[1])) {
        return message.channel.send(`🚫 **|** ${message.author}, você precisa colocar um némero valido!`);
    };

    db.subtract(`${user.id}_money`, args[1]);
    let bal = await db.fetch(`${user.id}_money`);

    let moneyEmbed = new Discord.MessageEmbed()
    .setTitle(":dollar: **|** Alteração Monetária")
    .setColor("RANDOM")
    .setDescription(`Foi removido **$${args[1]}** para ${user}!\n\n:dollar: Dinheiro Atual: **R$${bal}**`)
    .setFooter(`Money foi removido!`);
    message.channel.send(moneyEmbed);
}