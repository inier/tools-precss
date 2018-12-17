/**
 * Created by mosa on 2016/3/16.
 */
// 图片处理
var gulp = require('gulp'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'); //图片压缩
var config = require('../../config').images;

/**
 * Copy images to build folder
 * if not changed
 */
gulp.task('images', function () {
    return gulp.src(config.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.dest));
});

gulp.task('images:min', function () {
    return gulp.src(config.src)
        .pipe(changed(config.dest)) // Ignore unchanged files
        .pipe(imagemin(config.options))
        .pipe(gulp.dest(config.dest));
});

