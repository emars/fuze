var gulp = require('gulp');

var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('lint', function(){
	return gulp.src('./src/Fuze.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('build', function(){
	return gulp.src(['./src/Tween.js','./src/Fuze.js'])
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(rename('Fuze.min.js'))
		.pipe(gulp.dest('build'));
});
