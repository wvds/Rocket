// Requirements
var	server = require('./server'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass');
	livereload = require('gulp-livereload');

var env,
	source_js,
	source_sass,
	source_html,
	output_dir,
	sass_style;

// Environment will default to development
env = process.env.NODE_ENV || 'development';

if(env === 'development') {
  output_dir = 'builds/development/';
  sass_style = 'expanded';
} else {
  output_dir = 'builds/production/';
  sass_style = 'compressed';
}

// Sources
source_js 	= ['components/scripts/*.js'];
source_sass = ['components/sass/main.scss'];
source_html = ['views/*.ejs'];

// Concatenate JavaScript Files
gulp.task('js', function() {
 	gulp.src(source_js)
		.pipe(concat('main.js'))
		.pipe(browserify())
		.pipe(gulp.dest(output_dir + 'js'))
		.pipe(livereload());
});

gulp.task('compass', function() {
	gulp.src(source_sass)
		.pipe(compass({
				sass: 'components/sass',
				image: output_dir + 'images',
				styel: sass_style
			})
			.on('error', gutil.log))
		.pipe(gulp.dest(output_dir + 'css'))
		.pipe(livereload());
});

gulp.task('html', function() {
	gulp.src(source_html)
		.pipe(livereload())
});

gulp.task('watch', function() {
  	livereload.listen();
  	gulp.watch(source_js, ['js']);
  	gulp.watch('components/sass/*.scss', ['compass']);
  	gulp.watch(source_html, ['html']);
});

// Gulp Default
gulp.task('default', ['js', 'compass', 'watch']);

// Gulp Tasks
/*gulp.task('js', function() {
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
    //gulp.start('node');
	gulp.watch('comp/js/*.js', ['js']);
	gulp.watch('comp/sass/*.scss', ['compass']);
});

gulp.task('build', function() {
	// Building tasks here...
});

gulp.task('node', function() {
    nodemon({
        script: 'rocket.js',
        ext: 'js rb ejs',
        ignore: ['./public/**']
    }).on('restart', function() {
        console.log("Restarting server...");
    })
});*/