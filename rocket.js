// Requirements
var express = require('express'),
	rocket = express(),
	gulp = require('gulp'),
	lr = require('tiny-lr')();

// Middleware
rocket.use(require('connect-livereload')());
rocket.use(express.static(__dirname));

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

// Livereload server
lr.listen(35729, function() {
  console.log('... Listening on %s (pid: %s) ...', 35729);
})


gulp.watch('views/*.ejs', notifyLivereload);

function notifyLivereload(event) {
	// `gulp.watch()` events provide an absolute path
	// so we need to make it relative to the server root
	var fileName = require('path').relative(__dirname, event.path);
	lr.changed({
		body: {
		files: [fileName]
		}
	});
}