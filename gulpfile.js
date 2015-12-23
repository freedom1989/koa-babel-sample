const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('default', () => {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'stage-0'],
            plugins: ['transform-runtime']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});