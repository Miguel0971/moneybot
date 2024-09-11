const math = require('discord-math');
 
module.exports = {
    name: "Calcular",
    description: "O bot faz matemática para você",
    run: async (client, message, args) => {
        try {
            let num1 = Number(args[0]);
            let operation = args[0,1];
            let num2 = Number(args[0,2]);
            
            if (!num1) return message.channel.send(`${message.author} Primeiro número não especificado! (Caso tenha um erro adicional, tente separar, exemplo: 1 + 1)`);
            if (!operation) return message.channel.send(`${message.author} A opereção (+, -, /, *) não foi especificada! (Caso tenha um erro adicional, tente separar, exemplo: 1 + 1)`);
            if (!num2) return message.channel.send(`${message.author} Segundo número não específicado! (Caso tenha um erro adicional, tente separar, exemplo: 1 + 1)`);
 
            message.channel.send(`${message.author} Aqui está! Resposta: ${math.calculate(num1,operation,num2)}`);
        } catch (e) {
            console.log(e);
        }
    }
}