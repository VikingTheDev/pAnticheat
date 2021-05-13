# pAnticheat
This a FiveM "anticheat" script utilizing the [screenshot-basic](https://github.com/citizenfx/screenshot-basic) resource by [citizenfx](https://github.com/citizenfx/).
You **NEED** screenshot-basic and TxAdmin on your server for this script to work as intended.

# What is it?
The script will capture a screenshot of a user's game whenever they cause or is killed by an explosion. The screenshot will be sent to a discord channel via a webhook along with some other info for identification purposes. The screenshot should theoretically show any modmenus or other tools modders use that is drawn in/on the game.

# Installation
1. Clone or download this repository and put it in your server resource folder
2. Clone or download [screenshot-basic](https://github.com/citizenfx/screenshot-basic) and put it in your resource folder
3. Go to your discord logging channel, make a webhook and copy it. There's two parts of that link we're interested in; the webhook ID and the webhook token. (See the pic below)
![Alt text](https://cdn.discordapp.com/attachments/673250530382053442/841426331853914142/unknown.png "Webhook ID and token")
4. Add the webhook ID and token to the config file (src/server/config.json)
5. Add ``ensure pAnticheat`` and ``ensure screenshot-basic`` to your ``server.cfg`` file

# Exports

### sendScreenshot
Allows 3rd party resources to trigger the script.

```js
//Source of the player you want to get a screenshot from
let source = 1;
//Title for the discord embed
let title = 'Screenshot triggered by export';

exports.pAnticheat.sendScreenshot(src, title);
```