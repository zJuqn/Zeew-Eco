const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const zeew = require('zeew-eco')//LLAMAMOS EL PACKAGE
const  Economia  = new zeew.Tienda()


module.exports = {
  name: "tienda", 
  alias: [],

     /**
     *@param {Discord.client} client
     * @param {Discord.Message} message
     *@param {string[]} args
     */

execute: async (client, message, args) => {

    var perms = message.member.hasPermission("MANAGE_CHANNELS")
    if(!perms) return message.channel.send("No tienes los suficientes permisos para ejecutar este comando")//DEFINIMOS LOS PERMISOS

    const type = args[0]
    if(!type) return message.channel.send("Debes decir la accion que realizaras. `agregar/remover/reiniciar-tienda`")//QUE COLOQUE UNA ACCION

    if(type.toLocaleLowerCase() === 'agregar'){//EMPEZAMOS CON LA ACCION DE AGREGAR UN OBJETO
        const namexd = args[1]//NOMBRE DE EL OBJETO
        if(!namexd) return message.channel.send("Debes decir el nombre de el objeto")///SI NO COLOCA QUE RETORNE
        const precio = args[2]//EL PRECIO DE EL OBJETO
        if(!precio) return message.channel.send("Debes decir el precio de el objeto")//SI NO ES UN NUMERO QUE RETORNE
        const desc = args.slice(3).join(' ')//LA DESC DE EL OBJETO
        if(!desc) return message.channel.send("Debes decir la descripcion de el objeto")
        Economia.agregar(message.guild.id, namexd, desc, precio)//CREAMOS EL OBJETO
        message.channel.send("Se a agregado el item correctamente")
    };
    if(type.toLocaleLowerCase() === 'remover'){//ELIMINAR OBJETO
        message.channel.send("Para eliminar un item es necesario que veas la tienda y mires el ID de el item, con ese ID lo eliminaras").then(m => {
            m.delete({timeout: 3000})
        })
        const id = args.slice(1).join(' ')
        if(!id) return message.channel.send("Debes colocar el ID de el item")//EL ID DE EL OBJETO

        Economia.remover(message.guild.id, id)//REMOVEMOS

        await message.channel.send("El item a sido removido correctamente")//ENVIAMOS MENSAJE DE SATISFACTORIAMENTE
    }
    if(type.toLocaleLowerCase() === 'reiniciar'){//BORRAR TODA LA TIENDA
        message.channel.send("Estas seguro de eliminar toda la tienda?").then(msg => {//ENVIAMOS MENSAJE CON REACCION
            msg.react('✅')//REACCIONAMOS
            msg.react('❌')//REACCIONAMOS X2
            msg.awaitReactions((user, reaction) => {
                if(message.author.id !== user.id) return;//SI NO REACCIONA EL AUTHOR QUE SE JODA
                if(reaction.emoji.name === '✅'){//SI REACCIONA SE ELIMINARA LA TIENDA
                    Economia.reiniciar(message.guild.id)
                    message.channel.send("La economia a sido eliminada correctamente")
                }
                if(reaction.emoji.name === '❌'){//SI REACCIONA SE ELIMINARA EL MENSAJE EN 5 SEGUNDOS
                    message.channel.send("El comando a sido cancelado, este mensaje sera eliminado en 5 segundos")
                }
            })
            msg.delete({timeout: 5000})
        })
    }

}}