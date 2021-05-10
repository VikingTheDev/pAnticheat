const {webhookID, webhookToken} = require('./src/server/config.json');
const {WebhookClient, MessageEmbed} = require("discord.js")

//define the webhook we want to use by using the config settings
const Hook = new WebhookClient(webhookID, webhookToken)

//When a user triggers an explosion, get a screenshot and send it
on('explosionEvent', (source, ev) => {
  //request a screenshot
  exports['screenshot-basic'].requestClientScreenshot(source, {}, (err, data) => {
    //Encode the base64 data
    const imageStream = new Buffer.from(data.split("base64,")[1],'base64');
    //send to the webhook
    dNotif(source, imageStream, 'A user has caused an explosion');
  })
})

//When a user dies to an explosion, get a screenshot and send it
//I'm using TxAdmins log system for cause of death, no need to reinvent the wheel when it already exists
onNet('txaLogger:DeathNotice', (killer, cause) => {
  //TxAdmins logger emits an event for all deaths, we only want deaths by explosions (cars exploding, gas pumps exploding etc. This is what modders usually use)
  if(cause.includes('Explosion')) {
    //Have to declare source or else it work for some reason, I guess it's a scope issue
    const src = source;
    //request a screenshot
    exports['screenshot-basic'].requestClientScreenshot(src, {}, (err, data) => {
      //Encode the base64 data
      const imageStream = new Buffer.from(data.split("base64,")[1],'base64');
      //send to the webhook
      dNotif(src, imageStream, 'A user has been killed by an explosion');
    })
  }
})

//send an embed with the screenshot attached via the webhook
function dNotif(src, attachment, title) {
  //make the embed object, using discord.js here. Tried using https post requests but they wouldn't let me attach files for some reason
  const embed = new MessageEmbed()
    .setTitle(title)
    .setDescription(`Username: ${src} | ${GetPlayerName(src)}`)
    .addField("Identifiers", getIdentifiers(src))
    .setFooter("pAnticheat | Made by Petrikov")
    .setTimestamp(Date.now())
    .attachFiles(attachment);
  
  //log the embed in discord using the webhook
  Hook.send(embed);
}

//simple function to grab all of a users identifiers
function getIdentifiers(src) {
  let x;
  for(let i = 0; i < GetNumPlayerIdentifiers(src); i++) {
    if(i === 0) {
      x = GetPlayerIdentifier(src, i);
    } else {
      x = x + `\n${GetPlayerIdentifier(src, i)}`
    }
  }
  return x;
}