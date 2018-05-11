var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    del = require('del');

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('less', function () {
    return gulp.src('./less/*.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('copy', function () {
    return gulp.src([
        './*.html',
        //'./css/**',
        './js/**'
    ],  {base: '.'})
        .pipe(gulp.dest('./dist'));});

gulp.task('default', ['clean'], function() {
    gulp.start('less', 'copy');
});
