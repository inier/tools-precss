/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp');
var runSequence = require('run-sequence');

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('build:beta', function(callback) {
    runSequence(
        //'clean',
        ['html'], [
            'spritesRetina', //sprites
            'sass'
        ], ['js'], ['images'], [
            'base64' //,'sprites-svg'
        ], ['copy:font'],
        callback
    );
});