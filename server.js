var connection = require('./db'),
	app = require('./rocket')(connection),
	EXPRESS_PORT = 3000;

app.listen(EXPRESS_PORT, function() {
	console.log("Server running at localhost on port " + EXPRESS_PORT);
});