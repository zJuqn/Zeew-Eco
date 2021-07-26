const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const zeew = require('zeew-eco')//LLAMAMOS EL PACKAGE
const  Economia  = new zeew.Banco()


module.exports = {
  name: "withdraw", 
  alias: ["with"],

     /**
     *@param {Discord.client} client
     * @param {Discord.Message} message
     *@param {string[]} args
     */

execute: async (client, message, args) => {

    const cantidad = args.join(' ')//DEFINIMOS LA CANTIDAD
    if(!cantidad) return message.channel.send("Debes decir la cantidad a depositar")//SI NO COLOCA UNA CANTIDAD QUE RETORNE
    if(isNaN(cantidad)) return message.channel.send("Eso no es un numero valido para depositar")//SI NO ES UN NUMERO QUE RETORNE
    Economia.retirar(user.id, message.guild.id, cantidad)//RETIRAMOS DINERO
    message.channel.send(`Retiraste ${cantidad} de el banco correctamente`)//ENVIAMOS MENSAJE DE QUE TODO SALIO BIEN

}}