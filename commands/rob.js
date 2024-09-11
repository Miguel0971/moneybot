const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

exports.run = async (bot, message, args) => {
  
    let autor = message.author;
    
    let user = message.mentions.users.first();
    
    if(!user) {
        return message.channel.send(` ${autor} você tem que mencionar um membro para realizar seu roubo!`);
    };

    if(user.id == autor.id){
        return message.channel.send(` ${autor} você não pode se auto-roubar!`);
    };

    let user_money = await db.fetch(`${user.id}_money`)
    if(user_money == null) user_money = 0;

    let autor_money = await db.fetch(`${autor.id}_money`)
    if(autor_money == null) autor_money = 0;
        
    if(user_money <= 0) {
        return message.channel.send(` ${autor}, você não pode roubar alguém que não possui dinheiro!`);
    };

    let timeout = 36000000;

    let daily = await db.fetch(`rob_${message.guild.id}_${autor.id}`);

    if (daily !== null && timeout - (Date.now() - daily) > 0) {

        let time = ms(timeout - (Date.now() - daily));
  
        let timeEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(` Você já realizou um roubo hoje!\n\nTente novamente daqui a **${time.hours}h ${time.minutes}m ${time.seconds}s**`);
        
        message.channel.send(`${autor}`, timeEmbed);
    } else {
        
        let sorte = Math.floor(Math.random() * 4) + 1;
        
        if(sorte == 2) {
            
            let amount = Math.floor(Math.random() * autor_money) + 1;
            
            let moneyEmbed = new Discord.MessageEmbed()
            .setTitle("👮 Seu roubo falhou e você foi preso!")
            .setColor("RANDOM")
            .setDescription(`Você realizou um roubo e não se saiu muito bem!\nE você perdeu um total de **R$${amount}**!`);
           
            message.channel.send(`${autor}`, moneyEmbed);
            db.subtract(`${autor.id}_money`, amount);
            db.set(`rob_${message.guild.id}_${autor.id}`, Date.now());
        }else{
            
            let amount = Math.floor(Math.random() * user_money) + 1;
            let moneyEmbed = new Discord.MessageEmbed()
            .setTitle("🔫 Roubo Realizado Com sucesso!")
            .setColor("RANDOM")
            .setDescription(`Você roubou o ${user}!\nE você conseguiu uma quantia de **R$${amount}**!`);
            
            message.channel.send(`${autor}`, moneyEmbed);
            db.subtract(`${user.id}_money`, amount);
            db.add(`${autor.id}_money`, amount);
            db.set(`rob_${message.guild.id}_${autor.id}`, Date.now());
        };
    };
}