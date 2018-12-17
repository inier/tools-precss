/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    gulpUtil = require('gulp-util'),
    uglify = require('gulp-uglify'),    //jsѹ��
    rename = require('gulp-rename'),    //������
    concat = require('gulp-concat'),
    size = require('gulp-size');
var config = require('../../config').optimize.js;

/**
 * Copy and minimize JS files
 */
gulp.task('optimize:js', function () {
    return gulp.src(config.src)
        //.pipe(concat('main.js'))
        .pipe(gulp.dest(config.dest))
        .pipe(babel({ presets: ['env'] }))
        .pipe(uglify(config.options)).on('error', function (err) {
            gulpUtil.log(gulpUtil.colors.red('[Error]'), err.toString());
        })
        .pipe(size())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(config.dest));
});