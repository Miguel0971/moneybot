const db = require('quick.db');
const ms = require('parse-ms');

module.exports = {
    name: "daily",
    description: "pegue uma recompensa diaria",

    async run (client, message, args) {
        let user = message.author;
        let timeout = 86400000;
        let amount = 500;

        let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

        if(daily !== null && timeout - (Date.now() - daily) > 0){
            let time = ms(timeout - (Date.now() - daily));

            return message.channel.send(`Você já coletou seu prêmio diário. Volte mais tarde ${time.days}d, ${time.hours}h, ${time.minutes}m, and ${time.seconds}s`)
        } else {
            db.add(`${user.id}_money`, amount);
            db.set(`daily_${message.guild.id}_${user.id}`, Date.now());

            message.channel.send(`Você recebeu ${amount} moedas para sua conta! Boa sorte com seu dinheiro :3`)
        }
    }
}