/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('build:release', ['build:beta'], function (callback) {
    runSequence(
        'clean:release',
        [
            'optimize:css',
            'optimize:js',
            'optimize:images',
            'optimize:html',
            'copy:font:release'
        ],
        'revision',
        'rev:collect',
        ['gzip'],
        callback);
});