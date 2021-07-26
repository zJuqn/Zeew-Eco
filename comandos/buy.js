const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const zeew = require('zeew-eco')//LLAMAMOS EL PACKAGE
const  Economia  = new zeew.Tienda()


module.exports = {
  name: "buy", 
  alias: [],

     /**
     *@param {Discord.client} client
     * @param {Discord.Message} message
     *@param {string[]} args
     */

execute: async (client, message, args) => {

  const id = args.join(' ')//QUE COLOQUE EL ID
  if(!id) return message.channel.send("Debes decir el ID de el producto que quieres comprar")

  await Economia.comprar(message.author.id, message.guild.id, id)//COMPRAMOS

  message.channel.send("Tu compra fue realizada con exito, puedes ver el producto en tu inventario")//TODO SALIO BIEN :D

}}