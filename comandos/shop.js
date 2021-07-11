const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const zeew = require('zeew-eco')//LLAMAMOS EL PACKAGE
const { Economia } = new zeew.Tienda()

module.exports = {
  name: "shop", 
  alias: [],

     /**
     *@param {Discord.client} client
     * @param {Discord.Message} message
     *@param {string[]} args
     */

execute: async (client, message, args) => {

    const tienda = Economia.ver(message.guild.id)//HACEMOS LA FUNCION DE VER NUESTRA TIENDA

    message.channel.send(tienda)//ENVIAMOS NUESTRA TIENDA

}}
