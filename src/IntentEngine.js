const IntentTypes = {
	unknown: 'unknown',
};

function determineIntent(messageText) {
	return IntentTypes.unknown;
}

module.exports = {
	IntentTypes,
	determineIntent,
};