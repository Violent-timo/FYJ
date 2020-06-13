const gulp = require('gulp'); //引入gulp，生成一个gulp对象
const script = require('gulp-uglify'); //压缩js的插件
const babel = require('gulp-babel'); //es6转es5
const babelcore = require('babel-core');
const es2015 = require('babel-preset-es2015');
const imagemin = require('gulp-imagemin'); //图片压缩

const html = require('gulp-minify-html');//h5压缩

const css = require('gulp-clean-css'); //引入css压缩插件  css函数方法

//图片压缩
gulp.task('uglifyimg', () => {
    return gulp.src('src/imgs/*.{jpg,png,gif}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/imgs'))
});


//js压缩
gulp.task('uglifyjs', () => {
    return gulp.src('src/script/*.js')
        .pipe(babel({ //先将es6转换成es5
            presets: ['es2015'] //es2015->es6  es2016->es7...
        }))
        .pipe(script()) //执行js压缩
        .pipe(gulp.dest('dist/script'));
});

//html压缩
gulp.task('uglifyhtml', () => {
    return gulp.src('src/*.html')
        .pipe(html()) //执行html插件包
        .pipe(gulp.dest('dist/'));
});

//4.压缩css文件 - 引入插件包
gulp.task('uglifycss', () => {
    return gulp.src('src/css/*.css')
        .pipe(css()) //执行css插件包
        .pipe(gulp.dest('dist/css'));
});
