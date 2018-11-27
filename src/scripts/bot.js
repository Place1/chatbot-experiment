const CreateProject = require('../actions/CreateProject');
const IntentEngine = require('../IntentEngine');

const conversationState = {
	action: null,
};

const actions = [ CreateProject ];

function waitingForAction() {
	return conversationState.action === null;
}

function identifyAction(message) {
	const intentType = IntentEngine.determineIntent(message);
	const matchingAction = actions.find(action => {
		return action.intentType === intentType;
	});
	if (matchingAction === undefined) {
		throw new Error('couldn\'t identity the action');
	}
	return matchingAction;
}

function setActionForConversation(action, state) {
	state.action = new action();
}


module.exports = function(robot) {
	robot.hear(/(.*)/i, res => {
		// if we don't yet have an action for the conversation
		// attempt to find it from the message.
		// if we can't identify it, then say we don't understand...
		if (waitingForAction()) {
			try {
				const action = identifyAction(res.message);
				setActionForConversation(action, conversationState);
			} catch (error) {
				return res.send('Sorry I don\'t understand...[insert help here]')
			}
		}

		// if the action has all it's parameters satisfied:
		// 1. run it.
		// 2. report back to the user.
		// 3. reset the action of the conversation.
		const validation = conversationState.action.validateParameters();
		if (validation.valid) {
			return conversationState.action.run()
				.then(result => res.send(result))
				.then(() => {
					conversationState.action === null;
				});
		}

		// check if this message is trying to add information
		// if (attemptToAddInformation(res.message)) {
		// 	f(res.message.text, conversationState.action)
		// }

		// otherwise ask for the information we need.
		return res.send(validation.toString());
	});
};
