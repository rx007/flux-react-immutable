var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

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

gulp.task('default',['browserify', 'copy'], function() {
    return gulp.src('build/**/*.*', ['browserify', 'copy']);
});

gulp.task('watch',['browserify', 'copy'], function() {
    return gulp.watch('build/**/*.*', ['browserify', 'copy']);
});
