/**
 * Created by mosa on 2016/3/17.
 */
var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');
var cache = require('gulp-cache');
var changed = require('gulp-changed');
var config = require('../../config').images.sprites;

// 合并精灵图任务 ps:该任务为独立任务，无法作为链式pipe的输入
function doCombo(src, options, tBase) {
    var distImg = `${tBase}/${config.dest.image}`;
    var distCss = `${tBase}/${config.dest.css}`;

    console.log(src);
    // Generate our spritesheet
    var spriteData = gulp
        .src(src)
        .pipe(changed(src))
        .pipe(spritesmith(options));

    // Pipe image stream through image optimizer and onto disk
    var imgStream = spriteData
        .img
        // DEV: We must buffer our stream into a Buffer for `imagemin`
        .pipe(buffer())
        //.pipe(cache(imagemin()))
        .pipe(gulp.dest(distImg));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData
        .css
        //.pipe(csso())
        .pipe(gulp.dest(distCss));

    // Return a merged stream to handle both `end` events
    merge(imgStream, cssStream);
}

gulp.task('sprites', function() {
    for (var i = 0; i < config.dir.length; i++) {
        var tBase = `${config.dir[i]}`;
        var src = `${tBase}/${config.src}`;

        doCombo(src, config.options, tBase);
    }
});

gulp.task('spritesRetina', function() {
    for (var i = 0; i < config.dir.length; i++) {
        var tBase = `${config.dir[i]}`;
        var src = `${tBase}/${config.srcRetina}`;

        doCombo(src, config.optionsRetina, tBase);
    }
});