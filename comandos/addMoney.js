const zeew = require('zeew-eco')//LLAMAMOS EL PACKAGE
const  Economia  = new zeew.Economia()

module.exports = {
  name: "addmoney", 
  alias: [],

     /**
     *@param {Discord.client} client
     * @param {Discord.Message} message
     *@param {string[]} args
     */

execute: async (client, message, args) => {

    let user = message.mentions.users.first() || client.users.resolve(args[0])//DEFINIMOS USUARIO
    if(!user) return message.channel.send("Debes mencionar a un usuario o colocar su ID")//SI NO MENCIONA QUE RETORNE
    const cantidad = args.slice(1).join(" ")//QUE COLOQUE LA CANTIDAD 
    if(!cantidad) return message.channel.send("Debes decir la cantidad de dinero que le agregaras")//SI NO PONE CANTIDAD QUE RETORNE
    if(isNaN(cantidad)) return message.channel.send("Eso no es un numero valido")//SI NO ES UN NUMERO QUE RETORNE
    await Economia.agregar(user.id, message.guild.id, cantidad)//AGREGAMOS EL DINERO

    message.channel.send(`Le he agregado ${cantidad} a ${user.username}`)//ENVIAMOS MENSAJE QUE TODO SALIO BIEN

}}