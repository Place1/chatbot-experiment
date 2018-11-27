const jsonschema = require('jsonschema');


class CreateProjectAction {

	constructor() {
		this.params = {};
	}

	run() {
		this.validateParameters({ throwError: true });
		this.execute();
	}

	validateParameters(validationOptions) {
		const validator = new jsonschema.Validator();
		return validator.validate(this.params, CreateProjectAction.parametersSchema, validationOptions);
	}

	execute() {
		// do some work...
		return Promise.resolve({ result: 'success yay!' });
	}
}

CreateProjectAction.intentType = 'createProject';

CreateProjectAction.parametersSchema = {
	properties: {
		name: {
			type: 'string'
		}
	},
	required: [
		'name',
	],
};

module.exports = CreateProjectAction;
