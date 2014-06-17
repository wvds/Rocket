// Requirements
var	server = require('./server'),
	gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass'),
	livereload = require('gulp-livereload');

// Gulp Tasks
gulp.task('js', function() {
	return gulp.src('comp/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
		.pipe(livereload());
});

gulp.task('compass', function() {
	return gulp.src('comp/sass/*.scss')
		.pipe(compass({
			config_file: './config.rb',
			css: 'public/css',
			sass: 'comp/sass'
		}))
		.pipe(gulp.dest('public/css'))
		.pipe(livereload());
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('comp/js/*.js', ['js']);
	gulp.watch('comp/sass/*.scss', ['compass']);
});

gulp.task('build', function() {
	// Building tasks here...
});

// Gulp Default
gulp.task('default', ['watch']);