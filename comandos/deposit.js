const zeew = require("zeew-eco"); //LLAMAMOS EL PACKAGE
const Banco = new zeew.Banco();

module.exports = {
  name: "deposit",
  alias: ["dep"],

  /**
   *@param {Discord.client} client
   * @param {Discord.Message} message
   *@param {string[]} args
   */

  execute: async (client, message, args) => {
    const cantidad = parseInt(args.join(" ")) //DEFINIMOS LA CANTIDAD A DEPOSITAR
    console.log(isNaN(cantidad));
    if (!cantidad)
      return message.channel.send("Debes decir la cantidad a depositar"); //SI NO COLOCA LA CANTIDAD QUE RETORNE
    if (isNaN(cantidad))
      return message.channel.send("Eso no es un numero valido para depositar"); //SI NO ES UN NUMERO QUE RETORNE
    let depositar = await Banco.depositar(message.author.id, message.guild.id, cantidad); //AGREGAMOS EL DINERO
    if(!depositar.Economia) return message.channel.send("No tiene sufiente dinero"); //INSUFIENTE DINERO
    message.channel.send(
      "Depositaste " + cantidad + " correctamente en el banco"
    ); //ENVIAMOS MENSAJE DE QUE TODO A SALIDO BIEN
  },
};
