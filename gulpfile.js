var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

gulp.task('concat-js', function() {
	gulp.src([
		'node_modules/jquery/dist/jquery.min.js',
		'build/lib/semantic/semantic.min.js'
		])
		.pipe(concat('vendors.js'))
		.pipe(gulp.dest('static/js'))
});

gulp.task('concat-css', function() {
	gulp.src('./build/lib/semantic/semantic.min.css')
		.pipe(concat('vendors.css'))
		.pipe(gulp.dest('static/css'))
});

gulp.task('browserify', function() {
    browserify('./build/js/app.js')
      .transform('reactify')
      .bundle()
      .pipe(source('init-main.js'))
      .pipe(gulp.dest('static/js'));
});

gulp.task('copy',function() {
    gulp.src('build/index.html')
      	.pipe(gulp.dest('static'));
    gulp.src('build/assets/**/*.*')
      	.pipe(gulp.dest('static/assets'));
});

gulp.task('default',['browserify', 'copy', 'concat-js', 'concat-css'], function() {
    return gulp.src('build/**/*.*', ['browserify', 'copy', 'concat-js', 'concat-css']);
});

gulp.task('watch',['browserify', 'copy', 'concat-js', 'concat-css'], function() {
    return gulp.watch('build/**/*.*', ['browserify', 'copy', 'concat-js', 'concat-css']);
});
