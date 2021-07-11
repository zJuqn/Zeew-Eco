const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const zeew = require('zeew-eco')//LLAMAMOS EL PACKAGE
new zeew.Options("Tu URL de mongodb")//COLOCAMOS LA URL DE MONGO QUE ES DONDE SE GUARDARAN LOS DATOS

module.exports = {//EXPORTAMOS
  name: "work", //COLOCAMOS UN NOMBRE
  alias: [],

     /**
     *@param {Discord.client} client
     * @param {Discord.Message} message
     *@param {string[]} args
     */

execute: async (client, message, args) => {//EMPEZAMOS SI USAN RUN QUITEN EL EXECUTE Y PONGAN RUN

    const economia = new zeew.Economia();//CREAMOS NUEVO MODLO DE ECONOMIA

    let moneyObtenido = await economia.trabajar(message.author.id, message.guild.id, 700)//DONDE YO PUSE 700 ES EL DINERO QEU LE DARA A EL TRABAJAR

    let testos = ["Trabajaste de Bombero", "Trabajaste de Policia", "Trabajaste de Prostituta 😈", "Trabajaste de Actor Nop*r", "Trabajaste en el cine"]
    //aqui son los trabajos ustedes pueden poner mas si gustan

    var randy = Math.floor(Math.random() * testos.length);//DECIMOS QUE ENVIE RANDOM
    var testoRandy = testos[randy];//DEFINIMOS EL TEXTO FINAL
    let tumama = new Discord.MessageEmbed()//CREAMOS UN EMBED
    .setTitle("Felicidades")//COLOCAMOS UN TITULO
    .setDescription(`${testoRandy} y te pagaron ${moneyObtenido}`)//JUNTAMOS LOS TEXTOS Y LO QUE LE DARA DE MONEY
    .setColor("RANDOM")//COLOCAMOS UN COLOR

    message.channel.send(tumama)//ENVIAMOS EL EMBED

    //ESTO SERIA TODO LIKE FAVORITOS Y SUSCRIBANSE A JOT4ELE

}}