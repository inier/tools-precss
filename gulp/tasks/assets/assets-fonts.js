/**
 * Created by mosa on 2016/3/16.
 */
// FONT处理
var gulp = require('gulp'),
    cache = require('gulp-cache');
var config = require('../../config').font;
var configBeta = config.beta;
var configRelease = config.release;
var configDemo = config.demo;

gulp.task('copy:iconfont', function () {
    return gulp.src(configDemo.src)
        .pipe(gulp.dest(configDemo.dest));
});

gulp.task('copy:iconfont:release', function () {
    return gulp.src(configDemo.src)
        .pipe(gulp.dest(configDemo.release));
});

gulp.task('copy:font', ['copy:iconfont'], function () {
    return gulp.src(configBeta.src)
        .pipe(gulp.dest(configBeta.dest));
});

gulp.task('copy:font:tt', ['copy:iconfont:release'], function () {
    return gulp.src(configBeta.src)
        .pipe(gulp.dest(configBeta.dest));
});

/**
 * Copy fonts to folder
 */
gulp.task('copy:font:release', ['copy:font:tt'], function () {
    return gulp.src(configRelease.src)
        .pipe(gulp.dest(configRelease.dest));
});