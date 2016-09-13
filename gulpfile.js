var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css');

//Styles min
gulp.task('build-css', function() {
  	return gulp.src('./sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});

//Scripts concat
gulp.task('build-js', function() {
  return gulp.src(['./js/*.js', './js/services/*.js', './js/controllers/*.js',  
                   './js/directives/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    //only uglify if gulp is ran with '--type production'
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());;
});

// Watch for css changes
gulp.task('watch', function() {
	livereload.listen();
  	gulp.watch('sass/**/*.scss', ['build-css']);
  	gulp.watch(['./js/*.js', './js/services/*.js', './js/controllers/*.js'], ['build-js']);
});

// Default task
gulp.task('default', ['watch'], function() {
    gulp.start('build-css', 'build-js');
});