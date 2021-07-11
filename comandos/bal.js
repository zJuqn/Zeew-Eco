const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const zeew = require('zeew-eco')//LLAMAMOS EL PACKAGE
const { Economia } = new zeew.Economia()
const { Banco } = new zeew.Banco()

module.exports = {
  name: "bal", 
  alias: ["balance"],

     /**
     *@param {Discord.client} client
     * @param {Discord.Message} message
     *@param {string[]} args
     */

execute: async (client, message, args) => {

    let user = message.mentions.users.first() || message.author;//DEFINIMOS USUARIO

    let Manzana = await Economia.ver(user.id, message.guild.id)//OBTENEMOS EL DINERO
    let BnacoMoney = await Banco.ver(user.id, message.guild.id)//OBTENEMOS EL DINERO DE EL BANCO

    if(!Manzana) return message.channel.send("Ese usuario no tiene dinero")
    if(!BnacoMoney) return message.channel.send("Ese usuario no tiene dinero en el banco")

    let embed = new Discord.MessageEmbed()

    .setTitle("Dinero de: "+ user.username +"")
    .addField("Dinero:", Manzana)
    .addField("Banco:", BnacoMoney)
    .addField("Dinero total:", Manzana + BnacoMoney)

 


}}
