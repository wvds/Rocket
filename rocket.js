module.exports = function(projects) {
	
	// Convert JSON data to JavaScript array
	/*var arr_projects = [];
	for(var item in projects) {
		arr_projects.push(projects[item]);
	};*/
	
	// Requirements
	var express = require('express'),
		routes = require('./routes/route'),
		rocket = express();
	
	// Middleware
	rocket.use(require('connect-livereload')());
	rocket.use(express.static(__dirname));
	
	projects.on('error', console.error.bind(console, 'connection error'));
	projects.once('open', function callback() {
		console.log("Connected with MongoDB!");
		
		var testschema = require('./schemas/schema');
		
	});
	
	// Routes
	rocket.get('/', function(req, res) {
		res.render('index.ejs', {
			title: 'Rocket',
			body: '<h1>Welcome to Rocket!</h1>'
		});
	});
	
	/*rocket.get('/project', function(req, res) {
		res.render('project.ejs', {
			title: 'Rocket Projects',
			body: '<h1>Pick a Project!</h1>'
		});
	});*/
	
	rocket.get('/project', function(req, res) {
		var RocketSchema = require('./schemas/schema');
		RocketSchema.find()
			//.setOptions({ sort: 'admin' })
			.exec(function(err, projects) {
				if(err) {
					console.log(err);
					res.status(500).json({status: 'failure'});
				} else {
					console.log(projects);
					res.render('project.ejs', {
						projects: projects
					});
				}
			});
	});
	
	//rocket.put('/project/:name', routes.stamp);*/

	return rocket;
	
};