const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const zeew = require('zeew-eco')//LLAMAMOS EL PACKAGE
const { Economia } = new zeew.Economia()
new zeew.Options("Tu URL de mongodb")//COLOCAMOS LA URL DE MONGO QUE ES DONDE SE GUARDARAN LOS DATOS


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

    if(!Manzana){
        let embed = new Discord.MessageEmbed()
        .setTitle("Algo a salido mal")
        .setDescription("Ese usuario no tiene dinero")
        return message.channel.send(embed)//SI NO TIENE DINERO QUE RETORNE
    } else {//Y SI TIENE DINERO (ABRIMOS ELSE)
        let embedPeoJot4Ele = new Discord.MessageEmbed()
        .setTitle("El dinero actual de "+ user.username +"")
        .setDescription(`Es: **${Manzana}`)
        .setColor("PURPLE")
        message.channel.send(embedPeoJot4Ele)//ENVIA LA CANTIDAD DE DINERO QUE TIENE
    }

//ESTO A SIDO TODO LIKE Y SUSCRIBANSE PARA MAS :D

}}