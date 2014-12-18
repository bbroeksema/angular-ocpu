var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat-util'),
    ngAnnotate = require('gulp-ng-annotate'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    merge = require('merge-stream'),
    path = require('path'),
    runSequence = require('run-sequence'),
    pkg = require ('./package.json'),
    src;

src = {
  cwd: 'src',
  dist: 'dist',
  scripts: '*.js',
  index: 'module.js'
};

// Entry point
gulp.task('default', ['dist']);

gulp.task('dist', function() {
  runSequence('clean:dist', ['scripts:dist']);
});

gulp.task('clean:dist', function() {
  return gulp.src([src.dist + '/*'], {read: false})
    .pipe(clean());
});

var banner = gutil.template('/**\n' +
  ' * <%= pkg.name %>\n' +
  ' * @version v<%= pkg.version %> - <%= today %>\n' +
  ' * @link <%= pkg.homepage %>\n' +
  ' * @author <%= pkg.author.name %> (<%= pkg.author.email %>)\n' +
  ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
  ' */\n', {file: '', pkg: pkg, today: new Date().toISOString().substr(0, 10)});

gulp.task('scripts:dist', function() {

  merge(
    gulp.src([src.index, src.scripts], { cwd: src.cwd })
      .pipe(sourcemaps.init())
      .pipe(ngAnnotate())
      .pipe(concat(pkg.name + '.js', { process: function(src) { return '// Source: ' + path.basename(this.path) + '\n' + (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1'); }}))
      .pipe(concat.header('(function(window, document, undefined) {\n\'use strict\';\n'))
      .pipe(concat.footer('\n})(window, document);\n'))
      .pipe(concat.header(banner))
      .pipe(gulp.dest(src.dist))
      .pipe(rename(function(path) { path.extname = '.min.js'; }))
      .pipe(uglify())
      .pipe(concat.header(banner))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(src.dist)),

    // Build individual modules
    gulp.src(src.scripts, { cwd: src.cwd })
      .pipe(sourcemaps.init())
      .pipe(ngAnnotate())
      .pipe(rename(function(path){ path.dirname = ''; })) // flatten
      .pipe(concat.header(banner))
      .pipe(gulp.dest(path.join(src.dist, 'modules')))
      .pipe(rename(function(path) { path.extname = '.min.js'; }))
      .pipe(uglify())
      .pipe(concat.header(banner))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(path.join(src.dist, 'modules')))
  );
});
