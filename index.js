const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed, Collection, Guild } = require('discord.js');
require('dotenv').config();


const fs = require('fs'); 
let { readdirSync } = require('fs'); 

const mongo = require('mongoose'); //Defines mongoose

mongo.connect('TU URL DE MONGODB', { //Haces la conexion con la url
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('Conectado a MongoDB')) //Le haces un console.log para saber que se ha conectado correctamente
.catch(err => console.error(err)) //Capturas el error



client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    client.commands.set(command.name, command);
}


//////////////////EVENTO MESSAGE//////////////


client.on('message', async message => {

 let prefix = 'e!'



if(message.author.bot) return; 
if(!message.content.startsWith(prefix)) return;

let usuario = message.mentions.members.first() || message.member;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
if(cmd){
cmd.execute(client, message, args)
const mySecret = process.env['TOKEN']

}


})
client.login("Tu token")
