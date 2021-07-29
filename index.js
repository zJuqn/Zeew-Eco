require("dotenv").config();
const { Client, Collection } = require("discord.js");
const client = new Client();

const fs = require("fs");
const mongo = require("mongoose"); //Defines mongoose
const URL = `mongodb://root:root@localhost:27017/`; //URL DE MONGODB - ESTE ES UN EJEMPLO DE MONGODB EN LOCALHOST

mongo
  .connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Conectado a MongoDB")) //Le haces un console.log para saber que se ha conectado correctamente
  .catch((err) => console.error(err)); //Capturas el error

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./comandos")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./comandos/${file}`);
  client.commands.set(command.name, command);
}


client.on('ready', () => console.log(client.user.username))

client.on("message", async (message) => {
  let prefix = "e!";
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.find(
    (c) => c.name === command || (c.alias && c.alias.includes(command))
  );
  if (cmd) {
    cmd.execute(client, message, args);
  }
});
client.login(process.env.TOKEN);
