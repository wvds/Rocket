// Requirements
var express = require('express'),
	lr = require('tiny-lr')(),
	gulp = require('gulp');

// Public Interface
module.exports = function(express_app) {
	
	// Middleware
	express_app.use(require('connect-livereload')());
	express_app.use(express.static(__dirname));
	
	// Livereload server
	lr.listen(35729, function() {
	  console.log('... Listening on %s (pid: %s) ...', 35729);
	})
	
	// Let Gulp watch for changes...
	gulp.watch('views/*.ejs', notifyLivereload);

	// When a change is detected, reload the browser!
	function notifyLivereload(event) {
		// Make path relative to server
		var fileName = require('path').relative(__dirname, event.path);
		lr.changed({
			body: {
			files: [fileName]
			}
		});
	}
};