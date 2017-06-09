var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssMin = require('gulp-cssmin'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync');

// sass task
gulp.task('css', function() {
    return gulp.src(['components/sass/**/*.sass'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('development/css'))
        .pipe(browserSync.stream());
});

// Image minimize task
gulp.task('imagemin', function() {
    return gulp.src(['components/images/**/*.*'])
        .pipe(imagemin({
            // interlaced: true,
            progressive: true,
            // optimizationLevel: 5,
            svgoPlugins: [{ removeViewBox: true }]
        }))
        .pipe(gulp.dest('development/images/'));
});

// copy min.css files
gulp.task('copycss', function() {
    return gulp.src(['components/libs/bootstrap/dist/css/bootstrap.min.css', 'components/libs/font-awesome/css/font-awesome.min.css'])
        .pipe(gulp.dest('development/css'))
});

// copy min.js files
gulp.task('copyjs', function() {
    return gulp.src(['components/libs/bootstrap/dist/js/bootstrap.min.js', 'components/libs/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('development/js'))
});

// copy fonts
gulp.task('copyfonts', function() {
    return gulp.src(['components/libs/bootstrap/fonts/*.*', 'components/libs/font-awesome/fonts/*.*'])
        .pipe(gulp.dest('development/fonts'))
});

// move css, js and fonts to development folders
gulp.task('move', ['copycss', 'copyjs', 'copyfonts']);

// Browser sync server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "development"
        }
    });
    gulp.watch(['components/sass/**/*.sass'], ['css']);
    gulp.watch('development/*.html').on('change', browserSync.reload);
});

// default task
// gulp.task('default', ['css', 'watch', 'serve']);
gulp.task('default', ['css', 'serve']);