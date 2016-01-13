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
const mocha = require('gulp-mocha');
const help = require('gulp-help');
const path = require('path');

help(gulp);

gulp.task('default', ['help']);

gulp.task('dev', 'start development', ['lint', 'build', 'inspect'], () => {
    nodemon({
        script: "dest/src/app.js",
        watch: "dest/",
        ignore: ['dest/test', 'dest/logs', 'dest/src/static', 'dest/src/views'],
        env: {
            'NODE_ENV': 'development'
        },
        debug: true,
        nodeArgs: ['--debug']
    });

    gulp.watch(['src/**', 'test/**', 'conf/**'], ['lint', 'build']).on('change', function(event) {
        var path = event.path.substring(__dirname.length);
        console.log('__dirname: '+ __dirname);
        console.log(path);
        if (event.type === 'deleted') {
            if (path.indexOf('/src/static/') === 0) {
                delete cache.caches['static'][event.path];
            } else if (path.indexOf('/src/views/') === 0) {
                delete cache.caches['tmpl'][event.path];
            } else if (path.indexOf('/src/') === 0) {
                delete cache.caches['src'][event.path];
            } else if (path.indexOf('/conf/') === 0) {
                delete cache.caches['conf'][event.path];
            }
        }
    });
});

gulp.task('release', 'run this task before release. this will kick eslint check, build, and test', ['lint', 'build-without-test'], () => {
    runSequence('test');
});

gulp.task('clean', 'remove dest folder', () => {
    return gulp.src('dest', {
            read: false
        })
        .pipe(clean());
});


gulp.task('lint', 'kick eslint check', () => {
    return gulp.src(['src/**/*.js', 'test/**/*.js'])
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

gulp.task('test', 'run test code. NOTE: run this after build.', () => {
    return gulp.src('dest/test/**/*.js', {
            read: false
        })
        .pipe(mocha({
            reporter: 'nyan'
        }));
});

// Run all unit tests in debug mode
gulp.task('test-debug', 'run test code in debug mode, you can use node-inspector to debug your test code in this mode', function() {
    var spawn = require('child_process').spawn;
    spawn('node', [
        '--debug-brk',
        path.join(__dirname, 'node_modules/gulp/bin/gulp.js'),
        'test'
    ], {
        stdio: 'inherit'
    });
});

gulp.task('build-src', 'build and copy the server-side source code to dest folder', () => {
    return gulp.src(['src/**', '!src/static/**', '!src/views/**', '!src/conf/**'])
        .pipe(cache('src'))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'stage-0'],
            plugins: ['transform-runtime']
        }))
        .pipe(sourcemaps.write())
        .pipe(count('## files compiled'))
        .pipe(gulp.dest('dest/src'));
});

gulp.task('build-test', 'build and copy the test code to dest folder', () => {
    return gulp.src('test/**')
        .pipe(cache('test'))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'stage-0'],
            plugins: ['transform-runtime']
        }))
        .pipe(sourcemaps.write())
        .pipe(count('## test files compiled'))
        .pipe(gulp.dest('dest/test'));
});

gulp.task('build-static', 'build and copy the static resources to dest folder', () => {
    return gulp.src('src/static/**')
        .pipe(cache('static'))
        .pipe(count('## static files copied'))
        .pipe(gulp.dest('dest/src/static'));
});

gulp.task('build-tmpl', 'build and copy the template files to dest folder', () => {
    return gulp.src('src/views/**')
        .pipe(cache('tmpl'))
        .pipe(count('## template files copied'))
        .pipe(gulp.dest('dest/src/views'));
});

gulp.task('build-conf', 'build and copy configuration files to dest folder', () => {
    return gulp.src('conf/**')
        .pipe(cache('config'))
        .pipe(count('## config file copied'))
        .pipe(gulp.dest('dest/conf'));
});

gulp.task('inspect', 'start node-inspector', function() {
    gulp.src([]).pipe(nodeInspector({
        preload: false
    }));
});

gulp.task('build-without-test', 'build everything but test code into dest folder', ['build-tmpl', 'build-static', 'build-src', 'build-conf'])
gulp.task('build', 'build every thing into dest folder', ['build-without-test', 'build-test']);