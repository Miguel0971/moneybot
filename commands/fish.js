const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('parse-ms');

exports.run = async (bot, message, args) => {


let user = message.author;

  let quantia = await db.get(`peixes_${user.id}`)
  if(!quantia) quantia = 0;
  let argumento = args[0];
  if(argumento === 'inv') return message.channel.send(`Você tem no total **${quantia}** peixes!`)

  let vara = db.fetch(`vara_${user.id}`)
  let money = await db.fetch(`${user.id}_money`);

if(argumento === 'comprar'){
  if(money <= '149'){
     return message.channel.send(`Você não possui dinheiro o suficiente! Necessário $150`)
   } else if(money >= '150'){
     message.channel.send(`Vara comprada!`)
     db.subtract(`${user.id}_money`, 150)
     db.add(`vara_${user.id}`, 1)
   }
} else if(!vara){
  const embed1 = new Discord.MessageEmbed()
  .setTitle(`ERRO`)
  .setDescription(`Você não possui uma vara de pesca no seu inventário, utilize .fish comprar`)
  .setColor('RANDOM')
  .setTimestamp()
  message.channel.send(`${user}`, embed1)
} else {

  let peixes = Math.floor(Math.random() * 5) + 1;


    let timeout = 600000;
    let author = await db.fetch(`pescado_${message.guild.id}_${user.id}`);
  if(author !== null && timeout - (Date.now() - author) > 0){
            let time = ms(timeout - (Date.now() - author));
            return message.channel.send(`**Você já pescou! Tente novamente em ${time.minutes} minutos e ${time.seconds} segundos!**`)
  } else { 
    

  const embed = new Discord.MessageEmbed()
  .setTitle(`\🐟 Pesca!`)
  .setColor('LIGHT_BLUE')
  .setDescription(`\🎣 Você pescou **${peixes}** peixes!`)
  .setFooter('Você sabia que seus peixes podem ser usados para vender ou para comércio?? Tente fazer isso depois!')
  message.channel.send(embed)
  

  db.add(`peixes_${user.id}`, peixes)
  db.set(`pescado_${message.guild.id}_${user.id}`, Date.now())

  }
}

}