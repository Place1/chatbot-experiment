const natural = require('natural');
const MINIMUM_CONFIDENCE = 0.5;
const classifier = new natural.BayesClassifier();

const IntentTypes = {
	createProject: 'createProject',
};

classifier.addDocument('create a new project', IntentTypes.createProject);
classifier.addDocument('make a new project', IntentTypes.createProject);
classifier.addDocument('create a project', IntentTypes.createProject);
classifier.addDocument('I want to create a new project', IntentTypes.createProject);
classifier.train();

function determineIntent(message) {
	const closestIntent = classifier.getClassifications(message.text)[0];
	console.log(closestIntent);
	if (closestIntent.value > MINIMUM_CONFIDENCE) {
		return closestIntent.label;
	}
	return IntentTypes.unknown;
}

module.exports = {
	IntentTypes,
	determineIntent,
};
