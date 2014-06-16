module.exports = function() {
	
	// Requirements
	var express = require('express'),
		routes = require('./routes/index'),
		rocket = express();
	
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
	
	rocket.get('/project', function(req, res) {
		res.render('project.ejs', {
			title: 'Rocket Projects',
			body: '<h1>Pick a Project!</h1>'
		});
	});
	
	rocket.get('/project/:id', routes.project);
	
	return rocket;
};