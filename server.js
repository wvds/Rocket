var connection = require('./db'),
	app = require('./app')(connection),
	EXPRESS_PORT = 8000;

app.listen(EXPRESS_PORT, function() {
	console.log("Server running at localhost on port " + EXPRESS_PORT);
});