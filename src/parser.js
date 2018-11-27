const { Intent, determineIntent } = require('./IntentEngine');

function parser(message) {
	// determine message intent.

	// get any important data from the message
	// specific to the intent.

	return Object.assign({}, message, {
		intent: determineIntent(message),
		intentData: {}
	});
}

module.exports = parser;
