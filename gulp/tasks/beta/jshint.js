/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');   //js¼ì²é
var stylish = require('jshint-stylish');
var changed = require('gulp-changed');
var config = require('../../config').scripts.jshint;

/**
 * Check JavaScript sytax with JSHint
 */
gulp.task('jshint', function () {
    return gulp.src(config.src)
        .pipe(changed(config.dest))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});