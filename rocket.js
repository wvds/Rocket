module.exports = function(connection) {
	
	// Requirements
	var express = require('express'),
		routes = require('./routes/route')(), //require('./routes/route')(connection)
		rocket = express();
	
	// Middleware
	rocket.use(require('connect-livereload')());
	rocket.use(express.static(__dirname));	
		
		/*var project = new Project({
			name: "HANDO",
			date_start: Date.now(),
			date_end: Date.now()
		});
		
		console.log(project.name);
		
		project.save(function(err) {
			if(err) return console.error(err);
			console.log("saved");
		})*/
	
	// Routes
	rocket.get('/', function(req, res) {
		res.render('index.ejs', {
			title: 'Rocket',
			body: '<h1>Welcome to Rocket!</h1>'
		});
	});
	
	rocket.get('/project', routes.rd_project);

	return rocket;
	
};