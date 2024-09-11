
const { MessageEmbed } = require("discord.js")
const fs = require("fs")
const config = require('./../config.json')

module.exports = {
  name: "help",
  aliases: ["ajuda", "comandos", "cmd", "cmds", "comando"],
  run: async (client, message, args) => {

      let prefix = config.prefix

      let info = fs.readdirSync('./commands').map(arquivo => arquivo.replace(/.js/g, "")).join(", ")

      const embed = new MessageEmbed()
      .setAuthor(`Help ${client.user.tag}`, client.user.displayAvatarURL())
      .setDescription(`> Este são todos meus comandos, meu prefixo neste servidor é \`${prefix}\``)
      .addField("Informações", `\`${info}\``)
      .setColor("YELLOW")
      .setFooter(`Comando Requisitado por ${message.author.tag}`, message.author.displayAvatarURL({dynamic: true, format: "png", size: 2048}))
      .setTimestamp()
      .setThumbnail(message.guild.iconURL({dynamic: true, format: "png", size: 2048}))
      message.channel.send(embed)
  }
}