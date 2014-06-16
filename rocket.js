module.exports = function() {
	
	// Requirements
	var express = require('express');
	var rocket = express();
	
	// Middleware
	rocket.use(require('connect-livereload')());
	rocket.use(express.static(__dirname));
	rocket.listen(3000, function() {
		console.log("Server running at localhost on port " + 3000 + "...");
	});
	
	// Routes
	rocket.get('/', function(req, res) {
		res.render('index.ejs', {
			title: 'Rocket',
			body: '<h1>Welcome to Rocket!</h1>'
		});
	});
	
	return rocket;
};