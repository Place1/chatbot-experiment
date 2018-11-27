# Anatomy
* Session Management
	- Manages the history of the conversation
	- Conversation can span multiple sources (mobile, desktop, channels, direct messages, ...)
	- Unifies the chat flow across sources
* Parser
	- Tags message intent
	- Uses a trained classifier to match the message into the most likely intent
	- Uses another classifier (general purpose) to extract data from the message that go along with the intent
		- e.g. "change my name to Alice" would have intent 'name_change' and some associated data `{ target: <id of the user>, newName: 'Alice' }`
* Action
	- Designed to handle specific intents
	- The action is the part of the bot that 'does stuff'
	- May call 3rd party APIs
* Responder
	- Handles the result of a specific 'Action' by creating a human friendy response
	- The responder is the part of the system that will send a message back to the user

---

* the bot does something by running a Action with can take required/optional parameters (like a CLI command)
* the bot tries to:
	1. identify the users goal for the conversation (which Action they want to run)
	2. gather the required/optional parameters, perhaps suggesting what they are to inform the user
	3. pass the information to the Action to be run.
	4. relay the result of the Action back to the user
