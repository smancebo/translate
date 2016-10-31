
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var rename = require('gulp-rename');



var Paths = {
  translate : 'source/translate.js',
  translateMin: 'source/translate.min.js',
  lang: 'source/lang/**/*'
};
gulp.task('default',['build-translate','watch:translate']);

gulp.task('build-translate', function(){
  return gulp.src(Paths.translate)
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('source'));
});

gulp.task('copy-lang', function(){
  return gulp.src(Paths.lang)
  .pipe(gulp.dest('dist/lang'));
});

gulp.task('watch:translate', function(){
  return gulp.watch(Paths.translate, ['build-translate']);
});

gulp.task('dist',['build-translate', 'copy-lang'], function(){
  var translate = [
    Paths.translate,
    Paths.translateMin
  ];
  return gulp.src(translate)
  .pipe(gulp.dest('dist'));
});
