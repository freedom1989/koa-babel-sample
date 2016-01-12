const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cached');
const nodemon = require('gulp-nodemon');
const nodeInspector = require('gulp-node-inspector');
const exec = require('child_process').exec;
const count = require('gulp-count');
const clean = require('gulp-clean');
const eslint = require('gulp-eslint');
const runSequence = require('run-sequence');

gulp.task('build-scripts', () => {
    return gulp.src('src/**/*.js')
        .pipe(cache('scripts'))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'stage-0'],
            plugins: ['transform-runtime']
        }))
        .pipe(sourcemaps.write())
        .pipe(count('## files compiled'))
        .pipe(gulp.dest('dest'));
});

gulp.task('build-static', () => {
    return gulp.src('src/static/**')
        .pipe(cache('static'))
        .pipe(count('## static files copied'))
        .pipe(gulp.dest('dest/static'));
});

gulp.task('build-tmpl', () => {
    return gulp.src('src/views/**')
        .pipe(cache('tmpl'))
        .pipe(count('## template files copied'))
        .pipe(gulp.dest('dest/views'));
});

gulp.task('build-conf', () => {
    return gulp.src('src/conf/**')
        .pipe(cache('config'))
        .pipe(count('## config file copied'))
        .pipe(gulp.dest('dest/conf'));
});

gulp.task('lint', () => {
    return gulp.src('src/**/*.js')
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('watch', () => {
    // watch javascript
    gulp.watch('src/**/*.js', ['lint', 'build-scripts']).on('change', function (event) {
        if (event.type === 'deleted') {
            delete cache.caches['scripts'][event.path];
            // remember.forget('scripts', event.path);
        }
    });

    gulp.watch('src/static/**', ['build-static']).on('change', function (event) {
        if (event.type === 'deleted') {
            delete cache.caches['static'][event.path];
        }
    });
    gulp.watch('src/views/**', ['build-tmpl']).on('change', function (event) {
        if (event.type === 'deleted') {
            delete cache.caches['tmpl'][event.path];
        }
    });

    gulp.watch('src/conf/**', ['build-conf']).on('change', function (event) {
        if (event.type === 'deleted') {
            delete cache.caches['conf'][event.path];
        }
    });
});

gulp.task('inspect', function () {
    gulp.src([]).pipe(nodeInspector({  
        preload: false
    }));
});

gulp.task('build-src', ['build-tmpl', 'build-static', 'build-scripts']);

gulp.task('build', () => {
    runSequence('clean', 'lint', 'build-src', function() {
    });
});


gulp.task('dev', ['lint', 'build-conf', 'build-src', 'watch', 'inspect'], () => {
    nodemon({
        script: "dest/app.js",
        watch: "dest",
        env: { 'NODE_ENV': 'development' },
        debug: true,
        nodeArgs: ['--debug']
    });
});

gulp.task('default', ['dev']);

gulp.task('clean', () => {
    return gulp.src('dest', {read: false})
            .pipe(clean());
});