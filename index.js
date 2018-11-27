require('coffee-script/register');
const Hubot = require('hubot');
const path = require('path');
const parser = require('./src/parser');
const ConversationRepository = require('./src/session/ConversationRepository');

const adapterPath = path.resolve(__dirname);
const adapterName = process.env.ADAPTER || 'shell';
const enableHttpd = false ;
const botName = process.env.BOT_NAME || 'robot';
const botAlias = '/';
const robot = new Hubot.Robot(adapterPath, adapterName, enableHttpd, botName, botAlias);

/**
 * This Hubot middleware will add the result of the parser to
 * the message.
 */
function parseIntentMiddleware(context, next, done) {
	const processedMessage = parser(context.response.message);
	context.response.message = processedMessage;
	return next();
}

/**
 * This middleware will take the message and user id and
 * store it in the user's chat session.
 */
function sessionMiddleware(context, next, done) {
	const message = context.response.message;
	const user = message.user;
	const history = ConversationRepository.getByUserId(user.id);
	history.addMessage(message);
	return next();
}

robot.adapter.once('connected', () => {
	// Add our middleware
	// robot.receiveMiddleware(parseIntentMiddleware);
	// robot.receiveMiddleware(sessionMiddleware);

	// Load our scripts directory
	robot.load(path.resolve(__dirname, 'src', 'scripts'));
});

robot.run();
