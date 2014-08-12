module.exports = function(connection) {

	// Requirements
	var express = require('express'),
		bodyParser = require('body-parser'),
		session = require('express-session'),
		mongo_store = require('connect-mongo')(session),
		cookieParser = require('cookie-parser'),
		routes = require('./routes/route')(),
		passport = require('./auth'),
		rocket = express();

	// Middleware | SET
    rocket.set('view engine', 'ejs');

    // Middleware | USE
	rocket.use(require('connect-livereload')());
	rocket.use(express.static(__dirname));
	rocket.use(cookieParser());
	rocket.use(bodyParser.urlencoded({ extended: true }));
	rocket.use(session({
        secret: 'rocketio',
        resave: true,
        saveUninitialized: true,
		store: new mongo_store({
			mongoose_connection: connection
		})
    }));
	rocket.use(passport.initialize());
	rocket.use(passport.session());

	// Routes | GET
	rocket.get('/', function(req, res) {
		res.render('index.ejs', {
			title: 'Rocket',
			body: '<h1>Welcome to Rocket!</h1>'
		});
	});
	rocket.get('/project', routes.rd_project);
    rocket.get('/project/:code', routes.rd_editor);
	rocket.get('/login', routes.rd_login);
    rocket.get('/user', routes.rd_user);

    // Routes | POST
	rocket.post('/login', routes.rd_authenticate);

    // Return application
	return rocket;
};
