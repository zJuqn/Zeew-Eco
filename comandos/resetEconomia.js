const zeew = require('zeew-eco')//LLAMAMOS EL PACKAGE
const  Economia  = new zeew.Economia()


module.exports = {
  name: "reset-economia", 
  alias: ["reset-user-economia"],

     /**
     *@param {Discord.client} client
     * @param {Discord.Message} message
     *@param {string[]} args
     */

execute: async (client, message, args) => {

    let user = message.mentions.users.first() || client.users.resolve(args[0])//DEFINIMOS USUARIO
    if(!user) return message.channel.send("Debes mencionar a un usuario o colocar su ID")//SI NO MENCIONA QUE RETORNE

    await Economia.reiniciar(user.id, message.guild.id);//REMOVEMOS TODO EL DINERO DE EL USUARIO

    message.channel.send(`La economia de el usuario ${user.username} a sido reiniciada correctamente`)//ENVIAMOS QUE TODO SALIO BIEN

}}