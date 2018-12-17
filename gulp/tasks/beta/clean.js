/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp'),
    del = require('del'),
    cache = require('gulp-cache');
var config = require('../../config').del;

// 清除目标文件夹
gulp.task('clean:dist', function (callback) {
    return del(config.src, callback);
});

gulp.task('clean:cache', function (callback) {
    del(config.src);
    return cache.clearAll(callback);
});

gulp.task('clean:beta', function (callback) {
    return del(config.beta, callback);
});

gulp.task('clean:release', function (callback) {
    return del(config.release, callback);
});