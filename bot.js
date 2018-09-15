const fs = require("fs");
const botSettings = require("./bot-settings.json");
const Discord = require("discord.js");

const client = new Discord.Client();

// Keep Alive
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 180000);

function print(string) {
	console.log(string);
}
//

client.on("ready", async() => {
	console.log("Ready!");
});

client.on("message", async message => {
	if (message.author.bot) return;
	if (message.channel.type == "dm") {
    //do something
    return;
  }
  
  let messageArray = message.content.split(" ");
	let command = messageArray[0];
	let args = messageArray.slice(1);		
  
  if (command.startsWith(botSettings.prefix)) {
    let commandName = command.slice(botSettings.prefix.length,command.length);
    
    if (fs.existsSync("./cmds/"+commandName+".js")) {
      let cmd = require("./cmds/"+commandName+".js");
      
      cmd.start(message);
    }
  }
});

client.login(process.env.TOKEN);

function sendMessage(msg) {
  
}