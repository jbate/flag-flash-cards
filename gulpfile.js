var gulp = require('gulp');
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean');

gulp.task('styles', function() {
  return gulp.src('css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('css/prod'));
});

gulp.task('scripts', function() {
  return gulp.src(['js/*.js','!js/*min*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('js/prod'))
    .pipe(gulp.src('js/*min*'))
    .pipe(gulp.dest('js/prod'));
});

gulp.task('clean', function() {
  return gulp.src(['css/prod', 'js/prod'], {read: false})
    .pipe(clean());
});

gulp.task('default', ['clean'], function() {
    gulp.run('styles', 'scripts');
});