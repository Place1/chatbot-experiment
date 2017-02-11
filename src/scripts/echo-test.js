module.exports = function(robot) {
	robot.respond(/hello/i, (res) => {
		res.send(res.message.text);
	});
};
