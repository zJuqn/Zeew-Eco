const Discord = require('discord.js');
const zeew = require('zeew-eco')//LLAMAMOS EL PACKAGE
const  Economia  = new zeew.Tienda()


module.exports = {
  name: "shop", 
  alias: [],

     /**
     *@param {Discord.client} client
     * @param {Discord.Message} message
     *@param {string[]} args
     */

execute: async (client, message, args) => {

    const tienda = await Economia.ver(message.guild.id)//decimos que busque el id de el servidor
    if(!tienda) return message.channel.send("Este servidor no tiene una tienda")

let mensaje = "";//definimos un mensaje vacio
    tienda.map((items, posicion) => {//mapeamos es un array la tienda asi que es necesario
      console.log(`Posicion: ${posicion} - Nombre: ${items.name}`)//Hacemos un console log para saber que todo esta bien
      mensaje += `ID: **${items.id}** - Nombre: **${items.name}** - Descripcion: **${items.description}** - Precio: **${items.price}**\n`
      //AÑADIMOS EL MENSAJE//
    })
    const embed = new Discord.MessageEmbed()//HACEMOS EL EMBED
    .setTitle(`Tienda de el servidor ${message.guild.name}`)
    .setDescription(mensaje)
    .setColor("GREEN")
    .setTimestamp()

    message.channel.send(embed)//ENVIAMOS :D


}}