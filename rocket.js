// Requirements
var developer = require('./developer/livereload.js'),
	express = require('express'),
	rocket = express();

// Enable Live Reload
developer(rocket);

// Routes
rocket.get('/', function(req, res) {
    res.render('index.ejs', {
        title: 'Rocket',
        body: '<h1>Welcome to Rocket!</h1>'
    });
});

rocket.listen(3000, function() {
	console.log("Server running at localhost:3000...");
});