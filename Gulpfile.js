var gulp = require('gulp');
var gReplace = require('gulp-replace');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');
var runSequence = require('run-sequence');

var browserifyConfig = {
  entries: ['./index.js'],
  standalone: 'Fluxtore'
};

gulp.task('clean', function(cb) {
    del(['lib/', 'Fluxtore.js'], cb);
});

gulp.task('lib', function() {
    return gulp
        .src('src/*.js')
        .pipe(gulp.dest('lib'));
});

gulp.task('browserify', ['lib'], function() {
  return browserify(browserifyConfig)
          .bundle()
          .pipe(source('Fluxtore.js'))
          .pipe(gulp.dest('./dist/'))
});

gulp.task('build', ['lib', 'browserify']);

gulp.task('publish', function(cb) {
  runSequence('clean', 'build', cb);
});

gulp.task('default', ['build']);
