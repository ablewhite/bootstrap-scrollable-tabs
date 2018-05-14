var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    minify = require('gulp-minify'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    //sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    package_json = require('./package.json');

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('less', function () {
    return gulp.src('./less/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(replace('%DESCRIPTION%', package_json.description))
        .pipe(replace('%VERSION%', package_json.version))
        .pipe(replace('%NAME%', package_json.name))
        .pipe(replace('%COPYRIGHT_YEAR%', new Date().getFullYear()))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'))
        //.pipe(sourcemaps.init())
        .pipe(cssnano())
        //.pipe(sourcemaps.write('.'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('script', function() {
    return gulp.src('./js/*.js')
        .pipe(replace('%DESCRIPTION%', package_json.description))
        .pipe(replace('%VERSION%', package_json.version))
        .pipe(replace('%NAME%', package_json.name))
        .pipe(replace('%COPYRIGHT_YEAR%', new Date().getFullYear()))
        .pipe(minify({
            exclude: ['vendor'],
            preserveComments: 'some'
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('copy', function () {
    return gulp.src([
        './*.html',
        './js/**'
    ],  {base: '.'})
        .pipe(replace('%DESCRIPTION%', package_json.description))
        .pipe(replace('%VERSION%', package_json.version))
        .pipe(replace('%NAME%', package_json.name))
        .pipe(replace('%COPYRIGHT_YEAR%', new Date().getFullYear()))
        .pipe(gulp.dest('./dist'));});

gulp.task('default', ['clean'], function() {
    gulp.start('less', 'script', 'copy');
});
