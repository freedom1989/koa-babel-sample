const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const cache = require('gulp-cached');
const nodemon = require('gulp-nodemon');
const nodeInspector = require('gulp-node-inspector');
const exec = require('child_process').exec;
const count = require('gulp-count');
const clean = require('gulp-clean');

gulp.task('build-scripts', () => {
    return gulp.src('src/**/*.js')
        .pipe(cache('scripts'))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'stage-0'],
            plugins: ['transform-runtime']
        }))
        .pipe(sourcemaps.write())
        .pipe(count('## files compiled', {logFiles: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch-scripts', () => {
    var watcher = gulp.watch('src/**/*.js', ['build-scripts']); // watch the same files in our scripts task 
    watcher.on('change', function (event) {
        if (event.type === 'deleted') { // if a file is deleted, forget about it 
            delete cache.caches['scripts'][event.path];
            // remember.forget('scripts', event.path);
        }
    });
});

gulp.task('inspect', function () {
    gulp.src([]).pipe(nodeInspector({  
        preload: false
    }));
});

gulp.task('dev', ['build-scripts', 'watch-scripts', 'inspect'], () => {
    nodemon({
        script: "dist/server.js",
        watch: "dist",
        env: { 'NODE_ENV': 'development' },
        debug: true,
        nodeArgs: ['--debug']
    });
});

gulp.task('clean', () => {
    return gulp.src('dist', {read: false})
            .pipe(clean());
});