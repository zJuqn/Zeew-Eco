const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed, Collection, Guild } = require('discord.js');
require('dotenv').config();
const zeew = require('zeew-eco')
new zeew.Options("mongodb+srv://zJuqnPeroSeLeezJuan:thedegamer148@cluster0.71nhd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")


const fs = require('fs'); 
let { readdirSync } = require('fs'); 

const mongo = require('mongoose'); //Defines mongoose

mongo.connect('mongodb+srv://zJuqnPeroSeLeezJuan:thedegamer148@cluster0.71nhd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { //Haces la conexion con la url
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
if(message.channel.type === 'dm'){
  const servidor = client.guilds.resolve('840031068165767198')
  const everyone = servidor.roles.resolve('840031068165767198')
  const suport = servidor.roles.resolve('857034160363667466')
  const canal = client.channels.cache.map(x => x.name)
  if(canal.includes(message.author.id)){
    if(message.content.startsWith('e!close')){
      servidor.channels.cache.find((x) => x.name === message.author.id).delete()
      message.channel.send('El ticket a sido eliminado')
      return;
    }
    const embed = new Discord.MessageEmbed()
    .setTitle('Ticket de '+ message.author.username +'')
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`${message}`)
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter('Para cerrar el ticket utiliza e!close')
    servidor.channels.cache.find((x) => x.name === message.author.id).send(embed)
  }
  if(!canal.includes(message.author.id)){
    const peo = new Discord.MessageEmbed()
    .setTitle('Hola '+ message.author.username +'')
    .setDescription('Hola amigo, ¿Quieres crear un ticket?\nReacciona en: <a:vale:838557688563499008> para crear un ticket\nReacciona en: <a:nono:839288620384649226> para no crear un ticket')
    .setTimestamp()
    .setColor("GREEN")
    message.channel.send(peo).then(msg => {
      msg.react('838557688563499008')
      msg.react('839288620384649226')
      msg.awaitReactions((reaction, user) => {
        if(message.author.id !== user.id) return
        if(reaction.emoji.id === '839288620384649226'){
          const peofuerte = new Discord.MessageEmbed()
          .setTitle('Ok')
          .setDescription('El ticket a sido cancelado correctamente')
          .setColor("RED")
          msg.edit(peofuerte)
          return;
        }
        if(reaction.emoji.id === '838557688563499008'){
          let peonono = new Discord.MessageEmbed()
          .setTitle('Nono')
          .setDescription('Ya tienes un ticket creado no puedes crear otro')
          .setColor("YELLOW")
          if(canal.includes(message.author.id)) return message.channel.send(peonono)
          servidor.channels.create(message.author.id, {
            permissionOverwrites: [
              {
                id: everyone.id,
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
              },
              {
                id: suport.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
              }
            ],
            parent: '857029867663786004'
          }).then(c => {
            let embed2 = new Discord.MessageEmbed()
            .setTitle('Ticket creado')
            .setDescription('**'+ message +'**')
            .setColor("GREEN")
            .setTimestamp()
            c.send(embed2)
            message.channel.send('El ticket a sido creado correctamente')
          })
        }
      })
    })
    return;
  }
}
message.channel.send('El mensaje a sido enviado')
  if(message.channel.parentID === '857029867663786004'){
    if(message.content.startsWith('e!close')){
      const id = message.channel.name
      client.users.resolve(id).send('El ticket a sido eliminado por un staff')
      message.channel.delete()
      return;
    }
    if(message.channel.id === '840031068165767201') return;
    const id = message.channel.name
    const embed3 = new Discord.MessageEmbed()
    .setTitle(message.author.username)
    .setDescription(message)
    .setColor('BLUE')
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    client.users.resolve(id).send(embed3).catch(err => {
      message.channel.send('Hubo un error a el enviar el mensaje')
      return;
    })
  }

if(!message.content.startsWith(prefix)) return;

let usuario = message.mentions.members.first() || message.member;
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
if(cmd){
cmd.execute(client, message, args)

}


})
client.login(process.env.TOKEN)
