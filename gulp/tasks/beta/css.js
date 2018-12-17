/**
 * Created by mosa on 2016/3/17.
 */
// 样式处理
var gulp = require('gulp');                         //基础库
var scss = require('gulp-sass'),                    //scss
    sourcemaps = require('gulp-sourcemaps'),
    handleErrors = require('../../utils/handleErrors'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),                //合并文件
    autoPreFixer = require('gulp-autoprefixer'),
    changed = require('gulp-changed');
var config = require('../../config').styles;

//task: scss
gulp.task('sass', function () {
    return gulp.src(config.src)        //scss源文件
        .pipe(changed(config.dest))
        .pipe(sourcemaps.init())
        .pipe(plumber({ errorHandler: handleErrors }))  //错误提示
        .pipe(autoPreFixer(config.autoprefixer))
        .pipe(scss(config.mode.expanded).on('error', scss.logError))   //执行编译
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dest));  //输出目录
});

//task: ca-css
gulp.task('ca-css', function () {
    return gulp.src(config.caCss.src)
        .pipe(changed(config.caCss.dest))
        .pipe(sourcemaps.init())
        .pipe(plumber({ errorHandler: handleErrors }))
        .pipe(autoPreFixer(config.autoprefixer))
        .pipe(scss(config.mode.expanded).on('error', scss.logError))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(config.caCss.dest));
});

//task: demo-css
gulp.task('demo-css', function () {
    return gulp.src(config.demoCss.src)
        .pipe(changed(config.demoCss.dest))
        .pipe(sourcemaps.init())
        .pipe(plumber({ errorHandler: handleErrors }))
        .pipe(autoPreFixer(config.autoprefixer))
        .pipe(scss(config.mode.expanded).on('error', scss.logError))
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(config.demoCss.dest));
});

//task: copy:css
gulp.task('css:copy', ['sass'], function () {
    return gulp.src(config.srcCss)   //scss源文件
        .pipe(changed(config.dest))
        .pipe(gulp.dest(config.dest));  //输出目录
});