/**
 * Created by mosa on 2016/3/11.
 */
/* gulp命令会由gulpfile.js运行 */

// pngquant:深度压缩png图片的imagemin插件
//var pngquant = require('imagemin-pngquant');

var project = "caec", //当前项目名称
    version = "v0.0.1", //发布版本号

    src = 'src/projects/' + project, //源文件夹
    dest = 'dest/' + project, //目标文件夹

    beta = dest + '-' + version + '-beta', //开发环境
    release = dest + '-' + version + '-rev', //发布环境

    srcAssets = src + '/assets', //源资源文件
    betaAssets = beta + '/assets', //开发环境资源文件
    releaseAssets = release + '/assets'; //发布环境资源文件

var imageDir = 'img';
var cssDir = 'css';

// 精灵图sprite合并
var spriteDir = '_sprites';
var spriteDist = `${src}/**/${imageDir}`; //目标文件夹
var spriteOutFile = '_sprite';

module.exports = {
    product: {
        src: src,
        dest: dest
    },
    browserSync: {
        beta: {
            server: {
                //指定服务器启动根目录
                baseDir: ["./" + beta]
            },
            //覆盖主机检测，如果你知道正确的IP使用
            //host: "localhost",
            port: 30000,
            //更改默认端口weinre
            ui: {
                port: 30300,
                weinre: {
                    port: 30301
                }
            },
            files: [
                src + "/**/*.*",
                beta + "/**/*.*"
            ],
            //显示了我对过程的其他信息
            logLevel: "debug"
        },
        release: {
            server: {
                //指定服务器启动根目录
                baseDir: [release]
            },
            //port: 9092,
            files: [
                src + "/**/*.*",
                release + "/**/*.*"
            ]
        }
    },
    del: {
        beta: [beta + '/**/*'],
        release: [release + '/**/*'],
        src: [
            beta + '/**/*',
            '!' + betaAssets + '/**/*',
            release + '/**/*',
            '!' + releaseAssets + '/**/*'
        ]
    },
    watch: {
        html: src + '/demo/**/*.html',
        css: src + '/**/*.css',
        scss: src + '/**/!(_)*.scss',
        scripts: src + '/js/**/*.js',
        font: srcAssets + '/fonts/**/*',
        images: srcAssets + '/img/**/*',
        sprites: srcAssets + '/img/**/*.png',
        svg: srcAssets + '/img/vectors/**/*.svg'
    },
    html: {
        src: [
            src + "/demo/**/!(_)*.html",
            "!" + src + "/demo/_iconfont/**/*.*",
            "!" + src + "/demo/_res/**/*.*"
        ],
        dest: beta + "/demo"
    },
    styles: { //所有scss
        srcCss: [
            src + '/**/*.css',
            src + '/**/*.map'
        ], //所有css的源路径
        src: src + '/**/!(_)*.scss', //所有scss的源路径
        dest: beta + '/css', //所有css的目标路径
        sourceMapPath: src + "/css",
        options: {
            noCache: true,
            compass: false,
            bundleExec: true,
            sourcemap: true,
            precss: {},
            mqpacker: {}
        },
        mode: { //编译scss过程需要的配置，可以为空
            nested: { outputStyle: 'nested' }, //nested: 嵌套缩进的css代码，它是默认值；
            expanded: { outputStyle: 'expanded' }, //expanded: 没有缩进的、扩展的css代码；
            compact: { outputStyle: 'compact' }, //compact: 简洁格式的css代码；
            compressed: { outputStyle: 'compressed' } //compressed：压缩后的css代码。
        },
        autoprefixer: {
            browsers: [
                'last 2 versions',
                'safari 5',
                'ie 8',
                'ie 9',
                'opera 12.1',
                'ios 6',
                'android 4'
            ],
            cascade: true
        },
        csslint: {
            src: src + '/**/*.css'
        },
        caCss: {
            src: src + "/caec-mobile.scss",
            dest: beta + "/css"
            //"dest": "D:/workspace/CAEC-APP/CAECApp/www/shared/css"
        },
        demoCss: {
            src: src + "/demo.scss",
            dest: beta + "/css"
            //dest: "D:/workspace/CAEC-APP/CAECApp/www/CAEC-demo"
        }
    },
    scripts: {
        src: src + "/js/**/*.js",
        dest: beta + "/js",
        browserify: {
            // Enable source maps
            debug: true,
            // Additional file extensions to make optional
            extensions: ['.coffee', '.hbs'],
            // A separate bundle will be generated for each
            // bundle config in the list below
            bundleConfigs: [{
                entries: './' + src + '/js/application.js',
                dest: beta + '/js',
                outputName: 'application.js'
            }, {
                entries: './' + src + '/js/head.js',
                dest: beta + '/js',
                outputName: 'head.js'
            }]
        },
        jshint: {
            src: src + '/js/**/*.js'
        }
    },
    images: {
        src: srcAssets + "/img/**/*.*",
        dest: betaAssets + "/img",
        resize: {
            src: srcAssets + "/img/**/*.+(jpeg|jpg|png|tiff|webp)",
            dest: betaAssets + "/img/resize"
        },
        sprites: {
            // 这里添加需要打包精灵图的目录  "body-cacf", "body-car", "body-buyparts", "body-used-car-detail"
            dir: [
                srcAssets + '/' + imageDir
            ],
            src: '**/' + spriteDir + '/**/!(${spriteOutFile}|*@2x)*.png',
            srcRetina: '**/' + spriteDir + '/**/!(${spriteOutFile})*.png',
            dest: {
                css: '../../',
                image: '/'
            },
            options: {
                imgName: `${spriteOutFile}.png`, // 生成的图片
                cssName: `${spriteOutFile}.scss`, // 生成的sass文件
                imgPath: `../assets/${imageDir}/${spriteOutFile}.png`,
                padding: 2, // 图元之间的距离
                algorithm: 'binary-tree', // 图元的排序方式
                cssFormat: 'css',
                cssTemplate: "gulp/utils/sprites/handlebarsStr.scss.handlebars", // 模板,采用handlebar
                progressive: true, //图片为连续
                cssOpts: {
                    cssClass: function (item) {
                        // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
                        if (item.name.indexOf('-hover') !== -1) {
                            return '.icon-' + item.name.replace('-hover', ':hover');
                            // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
                        } else {
                            return '.icon-' + item.name;
                        }
                    }
                }
            },
            optionsRetina: {
                retinaSrcFilter: [`${spriteDist}/${spriteDir}/*@2x.png`],
                retinaImgName: `${spriteOutFile}@2x.png`,
                retinaImgPath: `../assets/${imageDir}/${spriteOutFile}@2x.png`,
                imgName: `${spriteOutFile}.png`, // 生成的图片
                cssName: `${spriteOutFile}.scss`, // 生成的sass文件
                imgPath: `../assets/${imageDir}/${spriteOutFile}.png`,
                padding: 2, // 图元之间的距离
                algorithm: 'binary-tree', // 图元的排序方式
                cssFormat: 'css',
                cssTemplate: "gulp/utils/sprites/handlebarsStr.scss.handlebars", // 模板,采用handlebar
                progressive: true //图片为连续
            }
        },
        svg: {
            src: [srcAssets + '/img/vectors/**/*.svg'],
            dest: betaAssets + '/img/vectors',
            sprites: {
                src: [
                    srcAssets + '/img/vectors/**/*.svg'
                    //,                    srcAssets + '/img/vectors/**/_siteTabs/**/*.svg'
                ],
                dest: {
                    css: beta,
                    image: betaAssets + '/img/vectors'
                },
                config: {
                    // Basic configuration example
                    base: {
                        mode: {
                            css: { // Activate the «css» mode
                                render: {
                                    css: true // Activate CSS output (with default options)
                                }
                            }
                        }
                    },
                    // More complex configuration example
                    complex: {
                        shape: {
                            dimension: { // Set maximum dimensions
                                maxWidth: 32,
                                maxHeight: 32
                            },
                            spacing: { // Add padding
                                padding: 4
                            },
                            dest: 'shape' // Keep the intermediate files
                        },
                        mode: {
                            view: { // Activate the «view» mode
                                bust: false,
                                render: {
                                    scss: true // Activate Sass output (with default options)
                                }
                            },
                            symbol: true // Activate the «symbol» mode
                        }
                    }
                }
            }
        },
        webp: {
            src: [srcAssets + '/img/**/*.{jpg,jpeg,png}'],
            dest: betaAssets + '/img/webp',
            options: {}
        },
        base64: {
            src: beta + '/css/**/*.css',
            dest: beta + '/css',
            options: {
                baseDir: release,
                extensions: ['png'],
                maxImageSize: 20 * 1024, // bytes
                debug: false
            }
        }
    },
    font: {
        demo: {
            src: src + '/demo/iconfont/**/*.*',
            dest: beta + '/demo/iconfont',
            release: release + '/demo/iconfont'
        },
        beta: {
            src: srcAssets + '/fonts/**/*',
            dest: betaAssets + '/fonts'
        },
        release: {
            src: betaAssets + '/fonts/**/*',
            dest: releaseAssets + '/fonts'
        }
    },
    markdown: {
        toPdf: {
            src: [src + '/doc/**/*.md'],
            src: [src + '/doc/css.md', src + '/doc/js.md'],
            dest: src + '/doc/pdf'
        },
        toHtml: {
            //src: [src + '/doc/**/*.md'],
            src: [src + '/doc/css.md', src + '/doc/js.md'],
            dest: src + '/doc/html'
        },
        fromHtml: {
            src: [src + '/doc/html2md/icons.html'],
            dest: src + '/doc/html2md'
        }
    },
    gzip: {
        src: release + '/**/*.{html,xml,json,css,js}',
        dest: release,
        options: {}
    },
    optimize: {
        html: {
            src: beta + '/demo/**/*.html',
            dest: release + '/demo',
            options: {
                removeComments: true, //清除HTML注释
                collapseWhitespace: true, //压缩HTML
                collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
                removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
                removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
                minifyJS: true, //压缩页面JS
                minifyCSS: true //压缩页面CSS
            }
        },
        css: {
            src: [
                beta + '/css/**/*.css',
                '!' + beta + '/css/**/(.min)*.css'
            ],
            dest: release + '/css',
            options: {
                keepSpecialComments: 0
            }
        },
        js: {
            src: [
                beta + '/js/**/*.js',
                '!' + beta + '/js/**/(.min)*.js'
            ],
            dest: release + '/js',
            options: {
                ie8: true,
                //mangle: true,//类型：Boolean 默认：true 是否修改变量名
                mangle: { reserved: ['require', 'exports', 'module', '$'] }, //排除混淆关键字
                compress: true //, //类型：Boolean 默认：true 是否完全压缩
                //preserveComments: all //保留所有注释
            }
        },
        images: {
            src: betaAssets + '/img/**/*.*',
            dest: releaseAssets + '/img',
            options: {
                optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [{ removeViewBox: false }] //不要移除svg的viewbox属性
                //use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
            }
        }
    },
    revision: {
        src: {
            assets: [
                release + '/css/**/*.css',
                release + '/js/**/*.js',
                releaseAssets + '/img/**/*'
            ],
            base: release
        },
        dest: {
            assets: release,
            manifest: {
                name: 'manifest.json',
                path: releaseAssets
            }
        }
    },
    collect: {
        src: [
            releaseAssets + '/manifest.json',
            release + '/**/*.{html,xml,txt,json,css,js}',
            '!' + release + '/feed.xml'
        ],
        dest: release
    }
};