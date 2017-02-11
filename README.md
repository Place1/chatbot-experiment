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

# Flow of a message
1. Hubot framework accepts the message via the adapter.
2. Framework sends the message through the middleware stack.
3. **Session Management** (a middleware) persists the message as part of the current conversation.
4. **Parser** (a middleware) tags the intent as best it can.
5. Framework finds the **Action** matching the intent and calls it, passing the message.
6. The result of the Action is passed into the correct **Responder** which sends a reply to the user.

# Terms **TODO**
* Conversation
* Intent

# Complex example
**User**: "create a new project called 'Inspire 81'"

*Parser*: 	
```json
{
	"message": "create a new project called 'Inspire 81'",
	"intent": "create project",
	"data": {
		"name": "Inspire 81"
	}
}
```
*Action*:
```javascript
// pseudocode
function createProjectAction(parsedMessage) {
	if (parsedMessage.data.name !== undefined) {
		createProjectWithName(parsedMessage.data.name);
		return new Response('success');
	}
	return new Response('information required', 'name');
}
```

*Response*: "The project 'Inspire 81' was successfully created 😀!"

**ChatBot**: <Response>
