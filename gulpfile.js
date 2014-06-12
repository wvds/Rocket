var gulp = require('gulp');

var jshint = require('gulp-jshint');

gulp.task('lint', function() {
	return gulp.src('comp/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
	gulp.watch('comp/js/*.js', ['lint']);
});

gulp.task('default', ['watch']);