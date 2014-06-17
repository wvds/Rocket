var db = require('./db'),
	app = require('./rocket')(db);

app.listen(3000, function() {
	console.log("Server running");
});