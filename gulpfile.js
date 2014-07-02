// Requirements
var	//server = require('./server'),
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass');
	//livereload = require('gulp-livereload');

// Sources
var source_js = ['components/scripts/*.js'],
	source_sass = ['components/sass/main.scss'];

// Concatenate JavaScript Files
gulp.task('js', function() {
	gulp.src(source_js)
		.pipe(concat('main.js'))
		.pipe(browserify())
		.pipe(gulp.dest('./builds/development/js'))
		.pipe(connect.reload())
});

gulp.task('compass', function() {
	gulp.src(source_sass)
		.pipe(compass({
				sass: 'components/sass',
				image: 'builds/development/images',
				styel: 'expanded'
			})
			.on('error', gutil.log))
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload())
});

gulp.task('connect', function() {
		connect.server({
			root: 'builds/development/',
			livereload: true,
			port: 8000
		});
});

gulp.task('watch', function() {
		gulp.watch(source_js, ['js']);
		gulp.watch('components/sass/*.scss', ['compass']);
});

// Gulp Default
gulp.task('default', ['js', 'compass', 'connect', 'watch']);

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