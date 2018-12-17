/**
 * Created by mosa on 2016/6/12.
 */
var gulp = require('gulp');
var markdownpdf = require("markdown-pdf");
var config = require('../../config').markdown.toPdf;
/**
 * Markdown2Pdf
 */
//gulp.task('Md2Pdf-fs', function () {
//    var fs = require("fs");
//    fs.createReadStream(config.src)
//        .pipe(markdownpdf())
//        .pipe(fs.createWriteStream(config.dest + "/document.pdf"));
//});

// --- OR ---
gulp.task('Md2Pdf-single', function () {
    var mdDocs = config.src;
    //var mdDocs = ["chapter1.md", "chapter2.md", "chapter3.md"];
    var docPath = config.dest + "/" + "readme.pdf";

    markdownpdf().concat.from(mdDocs).to(docPath, function () {
        console.log("Created", docPath);
    })
});
// --- OR ---
gulp.task('Md2Pdf-Multi', function () {
    var mdDocs = config.src;
    //var mdDocs = ["home.md", "about.md", "contact.md"];
    var filename, path;
    var pdfDocs = mdDocs.map(function (d) {
        path = d;
        //从路径中截取文件名[包括后缀名]
        if (path.indexOf("/") > 0) {
            //如果包含有"/"号 从最后一个"/"号+1的位置开始截取字符串
            filename = path.substring(path.lastIndexOf("/") + 1, path.length);
        }
        else {
            filename = path;
        }
        return config.dest + "/" + filename.replace(".md", ".pdf");
    });

    markdownpdf().from(mdDocs).to(pdfDocs, function () {

        pdfDocs.forEach(function (d) {
            console.log("Created", d);
        })
    });
});