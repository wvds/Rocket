var db = require('./db'),
	app = require('./rocket')(db),
	EXPRESS_PORT = 3000;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() { console.log("Connected to MongoDB"); });

app.listen(EXPRESS_PORT, function() {
	console.log("Server running at localhost on port " + EXPRESS_PORT);
});