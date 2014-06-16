// Requirements
var	express_app = require('./rocket.js')(),
	gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	compass = require('gulp-compass'),
	livereload = require('gulp-livereload');

// Gulp Tasks
gulp.task('lint', function() {
	return gulp.src('comp/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
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
	gulp.watch('comp/js/*.js', ['lint']);
	gulp.watch('comp/sass/*.scss', ['compass']);
});

// Gulp Default
gulp.task('default', ['watch']);