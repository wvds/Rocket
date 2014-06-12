var gulp = require('gulp');

var jshint = require('gulp-jshint');
var compass = require('gulp-compass');

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

gulp.task('default', ['watch']);