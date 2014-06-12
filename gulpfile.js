/*var	gulp = require('gulp'),	
	jshint = require('gulp-jshint'),
	compass = require('gulp-compass'),

gulp.task('lint', function() {
	return gulp.src('comp/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('compass', function() {
	return gulp.src('comp/sass/*.scss')
		.pipe(compass({
			config_file: './config.rb',
			css: 'public/css',
			sass: 'comp/sass'
		}))
		.pipe(gulp.dest('public/css'));
});

gulp.task('watch', function() {
	gulp.watch('comp/js/*.js', ['lint']);
	gulp.watch('comp/sass/*.scss', ['compass']);
});

gulp.task('default', ['watch']);*/

var gulp = require('gulp');
 
var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = 'comp/sass';
var LIVERELOAD_PORT = 35729;

// Let's make things more readable by
// encapsulating each part's setup
// in its own method
function startExpress() {
 
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
}
 
// We'll need a reference to the tinylr
// object to send notifications of file changes
// further down
var lr;
function startLivereload() {
 
  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}

// Notifies livereload of changes detected
// by `gulp.watch()` 
function notifyLivereload(event) {
 
  // `gulp.watch()` events provide an absolute path
  // so we need to make it relative to the server root
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
 
  lr.changed({
    body: {
      files: [fileName]
    }
  });
}

// Default task that will be run
// when no parameter is provided
// to gulp
gulp.task('default', function () {
 
  startExpress();
  startLivereload();
  gulp.watch('*.scss', notifyLivereload);
});