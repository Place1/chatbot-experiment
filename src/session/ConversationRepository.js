const ConversationHistory = require('./ConversationHistory');

class ConversationRepository {

	constructor() {
		this.userConversationMap = {}; // userId -> ConversationHistory
	}

	getByUserId(userId) {
		if (!this.userHasHistory(userId)) {
			this.startHistoryForUser(userId);
		}
		return this.userConversationMap[userId];
	}

	userHasHistory(userId) {
		return this.userConversationMap[userId] ? true : false;
	}

	startHistoryForUser(userId) {
		this.userConversationMap[userId] = new ConversationHistory();
	}
}

const instance = new ConversationRepository();

module.exports = instance;