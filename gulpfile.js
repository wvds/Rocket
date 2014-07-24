// Requirements
var	server = require('./server'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	gulpif = require('gulp-if'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush'),
	livereload = require('gulp-livereload');

// Sources
var source_js = ['components/scripts/*.js'],
	source_sass = ['components/sass/main.scss'],
	source_html = ['views/*.ejs'];

// Environment
var env = process.env.NODE_ENV || 'development';

if(env === 'development') {
 	output_dir = 'builds/development/';
 	sass_style = 'expanded';
} else {
 	output_dir = 'builds/production/';
 	sass_style = 'compressed';
}

// Tasks
gulp.task('js', function() {
 	gulp.src(source_js)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(browserify())
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(output_dir + 'js'))
		.pipe(livereload());
});

gulp.task('compass', function() {
	gulp.src(source_sass)
		.pipe(
	  		compass({
				css: output_dir + 'css',
				sass: 'components/sass',
				image: output_dir + 'images',
				style: sass_style,
				require: ['susy']
		  	})
		  	.on('error', gutil.log))
		.pipe(gulp.dest(output_dir + 'css'))
		.pipe(livereload());
});

gulp.task('html', function() {
	gulp.src(source_html)
		.pipe(livereload())
});

gulp.task('images', function() {
  gulp.src('builds/development/images/*.*')
  	.pipe(gulpif(env === 'production', imagemin({
		progressive: true,
	  	svgoPlugins: [{removeViewBox: false}],
	  	use: [pngcrush()]
	})))
  	.pipe(gulpif(env === 'production', gulp.dest(output_dir + 'images')))
  	.pipe(livereload());
});

gulp.task('watch', function() {
  	livereload.listen();
  	gulp.watch(source_html, ['html']);
  	gulp.watch(source_js, ['js']);
  	gulp.watch('components/sass/*.scss', ['compass']);
  	gulp.watch('builds/development/images/*.*', ['images']);
});

// Gulp Default Task
gulp.task('default', ['html', 'js', 'compass', 'images', 'watch']);