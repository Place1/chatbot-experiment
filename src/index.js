require('coffee-script/register');
const Hubot = require('hubot');
const path = require('path');

const adapterPath = path.resolve(__dirname);
const adapterName = process.env.ADAPTER || 'shell';
const enableHttpd = false ;
const botName = process.env.BOT_NAME || 'robot';
const botAlias = '/';
const robot = new Hubot.Robot(adapterPath, adapterName, enableHttpd, botName, botAlias);

robot.adapter.once('connected', () => {
	robot.load(path.resolve(__dirname, 'scripts'));
});

robot.run();
