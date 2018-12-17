/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite'),
    plumber = require('gulp-plumber');
//var svgSymbols = require('gulp-svg-symbols');

var config = require('../../config').images.svg.sprites;

/**
 * Generate sprite and css file from SVGs
 */
//gulp.task('sprites-svg', function () {
//    return gulp.src(config.src)
//        .pipe(svgSymbols())
//        .pipe(gulp.dest(config.dest.image));
//});


// gulp-svg-sprite

gulp.task('sprites-svg', function () {
    return gulp.src(config.src, {cwd: ''})
        .pipe(plumber())
        .pipe(svgSprite(config.config.complex))
        .on('error', function (error) {
            /* Do some awesome error handling ... */
        })
        .pipe(gulp.dest(config.dest.image));
});

