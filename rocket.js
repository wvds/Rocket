module.exports = function(connection) {
	
	// Requirements
	var express = require('express'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		mongo_store = require('connect-mongo')(session),
		cookieParser = require('cookie-parser'),
		routes = require('./routes/route')(),
		passport = require('./auth'),
		morgan = require('morgan'),
		rocket = express();
	
	// Middleware
	rocket.use(morgan());
	rocket.use(require('connect-livereload')());
	rocket.use(express.static(__dirname));
	
	rocket.use(cookieParser());
	rocket.use(bodyParser());
	rocket.use(session({ secret: 'keyboard cat' }));
	
	rocket.use(passport.initialize());
	rocket.use(passport.session());
		
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
	
	rocket.get('/login', routes.rd_login);
	rocket.post('/login', passport.authenticate('local', {
		failureRedirect: '/',
		successRedirect: '/user'
	}));
	rocket.get('/user', routes.rd_user);

	return rocket;
};