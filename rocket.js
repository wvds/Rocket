var express = require('express');

var rocket = express();

rocket.get('/', function(req, res) {
    res.render('index.ejs', {
        title: 'Rocket',
        body: '<h1>Welcome to Rocket!</h1>'
    });
});

rocket.listen(3000, function() {
	console.log("Listening on port 3000...");
});