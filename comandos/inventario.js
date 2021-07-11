const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const zeew = require('zeew-eco')//LLAMAMOS EL PACKAGE
const { Economia } = new zeew.Inventario()

module.exports = {
  name: "", 
  alias: [""],

     /**
     *@param {Discord.client} client
     * @param {Discord.Message} message
     *@param {string[]} args
     */

execute: async (client, message, args) => {
    
    const user = message.mentions.user.first() || message.author;

    const inventario = Economia.ver(message.guild.id, user.id)

    message.channel.send(inventario)
}}
