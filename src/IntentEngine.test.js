const { IntentTypes, determineIntent } = require('./IntentEngine');

describe('IntentEngine', () => {
	it('should return IntentTypes.unknown for a message of unknown intent', () => {
		expect(determineIntent('bla bla bla')).toBe(IntentTypes.unknown);
	});
});
