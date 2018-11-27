class ConversationHistory {
	constructor() {
		this.messages = [];
		this.currentConversationObjective = null;
	}

	addMessage(message) {
		this.messages.push(message);
	}
}

module.exports = ConversationHistory;
