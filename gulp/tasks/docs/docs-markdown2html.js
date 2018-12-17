/**
 * Created by mosa on 2016/6/12.
 */
var gulp = require('gulp');
var markdown = require('gulp-markdown');
var config = require('../../config').markdown.toHtml;

/**
 * Markdown2Html
 */
gulp.task('Md2Html', function () {
    return gulp.src(config.src)
        .pipe(markdown())
        .pipe(gulp.dest(config.dest));
});