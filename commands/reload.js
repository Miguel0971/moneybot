const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if (!['SEU ID'].includes(message.author.id))
    return message.channel.send(
      "Apenas meu criador pode utilizar!"
    );
  if (!args || args.length < 1)
    return message.channel.send("⚠️ Escreva o comando que deseja dar reload!");

    const commandName = args[0];

    if(!client.commands.has(commandName)) {
      return message.channel.send("⚠️ Comando inexistente!");
    }

    delete require.cache[require.resolve(`./${commandName}.js`)];

    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    const reload = new Discord.MessageEmbed()
    .setTitle('✔️ Reload ✔️')
    .setDescription(`O comando ${commandName} foi recarregado com sucesso!`)

    message.channel.send(reload);
};