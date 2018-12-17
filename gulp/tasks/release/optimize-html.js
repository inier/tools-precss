/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin');
var config = require('../../config').optimize.html;

/**
 * Minimize HTML
 */
gulp.task('optimize:html', function () {
    return gulp.src(config.src)
        .pipe(htmlmin(config.options))
        .pipe(gulp.dest(config.dest));
});