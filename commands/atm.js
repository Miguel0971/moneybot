const Discord = require('discord.js')
const Anime_Images = require('anime-images-api')
const db = require('quick.db')

exports.run = async (bot, message, args) => {
  const API = new Anime_Images() 
let { image } = await API.sfw.pat()
/* hug()    
kiss()    
slap()    
punch()                    
wink()    
pat()    
kill()    
cuddle()    
waifu()    

para colocar gif diferente, apenas trocar no let  image } = await API.sfw.pat() a parte do .pat() para o acima em questão
  */
  
  let moneypessoa = db.fetch(`${message.author.id}_money`)
  if(!moneypessoa) {
    moneypessoa = '0'
  }
  let moneybanco = db.fetch(`${message.author.id}_bank`)
  if(!moneybanco) {
    moneybanco = '0'
  }

  const embed = new Discord.MessageEmbed()
  .setTitle(`💸 Money 💸`)
  .setDescription(`Sua carteira diz que você tem: `)
  .addFields({
    name: '💵 Carteira:',
    value: `$${moneypessoa}`,
    inline: true
  },
             {
               name: '🪙 Banco:',
               value: `$${moneybanco}`,
               inline: true
             })
  .setColor('#00ff1f')
  .setTimestamp()
  .setThumbnail(message.author.displayAvatarURL())
  .setImage(image)
  message.channel.send(`${message.author}`, embed)
  
}