const Discord = require('discord.js')
const Anime_Images = require('anime-images-api')
const db = require('quick.db')

exports.run = async (bot, message, args) => {
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
  
  const API = new Anime_Images() 
let { image } = await API.sfw.hug()
/* hug()    
kiss()    
slap()    
punch()                    
wink()    
pat()    
kill()    
cuddle()    
waifu()    
  */
  let money = db.fetch(`${user.id}_money`)

  const embed = new Discord.MessageEmbed()
  .setTitle()
  .setDescription()
  .setColor()
  .setTimestamp()
  .setFooter(`• Autor: ${user.tag}`, message.author.displayAvatarURL({format: "png"}))
  
}