const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');

gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({suffix: ".min", prefix: ""}))
            .pipe(autoprefixer())
            .pipe(cleanCSS({compatibility: 'ie8'}))      
            .pipe(gulp.dest("dist/css"))
            .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function () {
    return gulp.src("src/**/*.js")
        .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', function () {
    return gulp.src("src/**/*.+(eot|ttf|woff|woff2)")
        .pipe(gulp.dest('dist/'));
});

gulp.task('icons', function () {
    return gulp.src("src/**/*.+(png|svg)")
        .pipe(gulp.dest('dist/'));
});

gulp.task('mailer', function () {
    return gulp.src("src/**/*.+(php|md)")
        .pipe(gulp.dest('dist/'));
});

gulp.task('img', function () {
    return gulp.src("src/**/*.jpg")
        .pipe(imagemin())
        .pipe(gulp.dest('dist/'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'fonts', 'mailer', 'img', 'icons'));