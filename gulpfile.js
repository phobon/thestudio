var gulp = require('gulp');
var clean = require('gulp-clean');

// Typescript transpiling
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

// Bundling
var browserify = require("browserify");
var through = require("through2");
var globby = require("globby");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

// Minifying
var uglify = require("gulp-uglify");

// Stylesheet transpiling
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var nano = require('cssnano');
var rename = require('gulp-rename');

// Use this task to just compile the typescript
gulp.task('tsc', function() {
    var result = gulp.src(['./src/**/*.ts', './typings/main/**/*.ts'])    
        .pipe(sourcemaps.init())
        .pipe(tsc({
            noExternalResolve: false,
            target: 'ES5',
            module: 'commonjs',
            moduleResolution: 'classic'
        }));
        
    return result.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/scripts'))
});

// Compile less files (css preprocessor)
gulp.task('less', function() {
    var processors = [nano];    
    return gulp.src('./src/stylesheets/thestudio.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./public/stylesheets'))
});

// Clean all of our old js files
gulp.task('clean', function() {    
    return gulp.src(['./public/scripts/*.js'])
        .pipe(clean());
})

// Build our release files - if you don't mind compiling taking a couple of seconds, use this.
gulp.task('release', ['clean', 'tsc', 'less'], function() {
    var bundledStream = through();
    
    // Set up our bundled stream with the output that we want to achieve.
    bundledStream
        .pipe(source('./public/scripts/thestudio.min.js'))
        .pipe(buffer())   
        //.pipe(uglify())
        .pipe(gulp.dest('./'));        
    
    // Match files based on a pattern and pipe into our bundled stream.
    globby(['./public/scripts/*.js']).then(function(entries) {
        var b = browserify({ entries: entries }); 
        b.external("jquery");
        b.external("velocity-animate");
        b.bundle().pipe(bundledStream);
    }).catch(function(err) {
        bundledStream.emit('error', err);
    });
    
    return bundledStream;
});