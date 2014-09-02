module.exports = function(connection) {

	// Requirements
	var express = require('express'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		mongo_store = require('connect-mongo')(session),
		cookieParser = require('cookie-parser'),
		routes = require('./routes/route')(),
		passport = require('./auth'),
		app = express(),
        numCPUs = require('os').cpus().length;
    
    console.log("CPUs: " + numCPUs);

	// Middleware | SET
    app.set('view engine', 'ejs');

    // Middleware | USE
	app.use(require('connect-livereload')());
	app.use(express.static(__dirname));
	app.use(cookieParser());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(session({
        secret: 'rocketio',
        resave: true,
        saveUninitialized: true,
		store: new mongo_store({
			mongoose_connection: connection
		})
    }));
	app.use(passport.initialize());
	app.use(passport.session());

	// Routes | GET
	app.get('/', function(req, res) {
		res.render('index.ejs', {
			title: 'Rocket',
			body: '<h1>Welcome to Rocket!</h1>'
		});
	});
	app.get('/project', routes.rd_project);
    app.get('/project/:code', routes.rd_editor);
	app.get('/login', routes.rd_login);
    app.get('/user', routes.rd_user);

    // Routes | POST
	app.post('/login', routes.rd_authenticate);

    // Return application
	return app;
};
