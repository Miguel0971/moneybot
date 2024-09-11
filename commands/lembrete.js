exports.run = async (client, message, args, level) => { 
    var time = args[0];
    var reminder = args.splice(1).join(' ');

    if (!time) return message.channel.send('**Não posso te lembrar se você não definir um **`tempo...`');
    if (!reminder) return message.channel.send('**Você esqueceu de inserir uma `mensagem!`**');

    time = await time.toString();

    if (time.indexOf('s') !== -1) { 
        var timesec = await time.replace(/s.*/, '');
        var timems = await timesec * 1000;
    } else if (time.indexOf('m') !== -1) { 
        var timemin = await time.replace(/m.*/, '');
        timems = await timemin * 60 * 1000;
    } else if (time.indexOf('h') !== -1) {
        var timehour = await time.replace(/h.*/, '');
        timems = await timehour * 60 * 60 * 1000;
    } else if (time.indexOf('d') !== -1) { 
        var timeday = await time.replace(/d.*/, '');
        timems = await timeday * 60 * 60 * 24 * 1000;
    }    else {
        return message.channel.send('**O tempo deve ser `númerico [s/m/h/d]`**');
    }

    message.channel.send(`Eu vou lembrar você de \`${reminder}\` daqui \`${time}\``);

    setTimeout(function () {
        message.channel.send(`Você me pediu para te lembrar de \`${reminder}\` `);
    }, parseInt(timems));

};

exports.help = {
    name: 'lembrete',
    aliases: ['lembrar'],
    description: 'Para quando você não pode esquecer de algo!',
    usage: 'lembrete [s/m/h/d] [mensagem]'
};