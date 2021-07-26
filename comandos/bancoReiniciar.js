const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const zeew = require('zeew-eco')//LLAMAMOS EL PACKAGE
const  Banco  = new zeew.Banco()


module.exports = {
  name: "bancoreiniciar", 
  alias: ["banco-reset"],

     /**
     *@param {Discord.client} client
     * @param {Discord.Message} message
     *@param {string[]} args
     */

execute: async (client, message, args) => {

    var perms = message.member.hasPermission("ADMINISTRATOR")//DEFINIMOS LOS PERMISOS NECESARIOS    
    if(!perms) return message.channel.send("No tienes los permisos para ejecutar este comando")//SI NO TIENE PERMS QUE RETORNE
    let user = message.mentions.users.first() || client.users.resolve(args[0])//DEFINIMOS A EL USER
    if(!user) return message.channel.send("Debes mencionar a un usuario o colocar su ID")//SI NO MENCIONA QUE RETORNE
    await Banco.reiniciar(user.id, message.guild.id)//REINICIAMOS EL DINERO EL DINERO
    message.channel.send(`Se le ha reiniciado el banco a ${user.username}`)//ENVIAMOS MENSAJE QUE TODO SALIO BIEN

}}