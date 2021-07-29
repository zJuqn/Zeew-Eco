const zeew = require("zeew-eco"); //LLAMAMOS EL PACKAGE
const Economia = new zeew.Inventario();

module.exports = {
  name: "inventario",
  alias: ["inv"],

  /**
   *@param {Discord.client} client
   * @param {Discord.Message} message
   *@param {string[]} args
   */

  execute: async (client, message, args) => {
    const user = message.mentions.user.first() || message.author; //DEFINIMOS USUARIO

    const inventario = await Economia.ver(message.guild.id, user.id); //MIRAMOS

    message.channel.send(inventario); //ENVIAMOS :D
  },
};
