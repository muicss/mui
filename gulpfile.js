'use strict';


var fs = require('fs');

var babelCore = require('babel-core'),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    stringify = require('stringify');

var reactBabelHelpers = [
  'inherits',
  'createClass',
  'classCallCheck',
  'possibleConstructorReturn',
  'interopRequireDefault',
  'interopRequireWildcard',
  'extends',
  'objectWithoutProperties'
];

var angularBabelHelpers = [
  'interopRequireDefault',
  'interopRequireWildcard'
];



// ============================================================================
// PUBLIC TASKS
// ============================================================================

gulp.task('cdn:build', gulp.series(
  clean('./packages/cdn'),
  buildCdn('./packages/cdn')
));


gulp.task('e2e-tests:build', gulp.series(
  clean('./e2e-tests/tests.js'),
  buildE2eTests
));


gulp.task('examples:build', gulp.series(
  clean('./examples/assets/mui'),
  clean('./examples/email-inlined'),
  buildExamples()
));


gulp.task('meteor:build', gulp.series(
  clean('./packages/meteor/lib'),
  buildMeteor()
));


gulp.task('npm:build', gulp.series(
  clean('./packages/npm/lib'),
  buildNpm()
));


gulp.task('build-packages', gulp.parallel(
  'cdn:build',
  'meteor:build',
  'npm:build'
));


gulp.task('build-all', gulp.parallel(
  'examples:build',
  'e2e-tests:build',
  'build-packages'
));



// ============================================================================
// PRIVATE TASKS
// ============================================================================

var del = require('del'),
    babelify = require('babelify');


function makeTask(displayName, fn) {
  if (displayName) fn.displayName = displayName;
  return fn;
}


function clean(dirname) {
  return makeTask('clean: ' + dirname, function(done) {
    return del(dirname, done);
  });
}



// ----------------------------------------------------------------------------
// CDN TASKS
// ----------------------------------------------------------------------------

function buildCdn(dirname) {
  var cssDir = dirname + '/css';

  var t1 = gulp.parallel(
    buildCdnCss(cssDir),
    buildCdnJs(dirname + '/js'),
    buildCdnReact(dirname + '/react'),
    buildCdnAngular(dirname + '/angular'),
    buildCdnEmailInline(dirname + '/email'),
    buildCdnEmailStyletag(dirname + '/email'),
    buildCdnColors(dirname + '/extra')
  );

  var t2 = gulp.parallel(
    buildCdnWebcomponents(dirname + '/webcomponents', cssDir),
    buildCdnJsCombined(dirname + '/extra', cssDir),
    buildCdnReactCombined(dirname + '/extra', cssDir),
    buildCdnAngularCombined(dirname + '/extra', cssDir)
  );

  return gulp.series(t1, t2);
}


function buildCdnCss(dirname) {
  return makeTask('build-cdn-css: ' + dirname, function() {
    return gulp.src('./src/sass/mui.scss')
      .pipe(plugins.sass({outputStyle: 'expanded'}))
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .on('error', function(err) {console.log(err.message);})
      .pipe(plugins.rename('mui.css'))
      .pipe(gulp.dest(dirname))
      .pipe(plugins.cssmin({advanced: false}))
      .pipe(plugins.rename('mui.min.css'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnJs(dirname) {
  return makeTask('build-cdn-js: ' + dirname, function() {
    return gulp.src('./build-targets/cdn-js.js')
      .pipe(plugins.browserify({
        paths: ['./']
      }))
      .pipe(plugins.rename('mui.js'))
      .pipe(gulp.dest(dirname))
      .pipe(plugins.uglify())
      .pipe(plugins.rename('mui.min.js'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnReact(dirname) {
  var s = babelCore.buildExternalHelpers(reactBabelHelpers, 'global');

  return makeTask('build-cdn-react: ' + dirname, function() {
    return gulp.src('./build-targets/cdn-react.js')
      .pipe(plugins.browserify({
        transform: [babelify.configure({plugins: ['external-helpers-2']})],
        paths: ['./', './node_modules'],
        external: ['react'],
        extensions: ['.jsx']
      }))
      .pipe(plugins.replace("require('react')", "window.React"))
      .pipe(plugins.injectString.prepend(s))
      .pipe(plugins.rename('mui-react.js'))
      .pipe(gulp.dest(dirname))
      .pipe(plugins.uglify())
      .pipe(plugins.rename('mui-react.min.js'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnAngular(dirname) {
  var s = babelCore.buildExternalHelpers(angularBabelHelpers, 'global');

  return makeTask('build-cdn-angular: ' + dirname, function() {
    return gulp.src('./build-targets/cdn-angular.js')
      .pipe(plugins.browserify({
        transform: [babelify.configure({plugins: ['external-helpers-2']})],
        paths: ['./', './node_modules/'],
        external: ['angular']
      }))
      .pipe(plugins.replace("require('angular')", "window.angular"))
      .pipe(plugins.injectString.prepend(s))
      .pipe(plugins.concat('mui-angular.js'))
      .pipe(gulp.dest(dirname))
      .pipe(plugins.ngmin())
      .pipe(plugins.uglify())
      .pipe(plugins.rename('mui-angular.min.js'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnEmailInline(dirname) {
  return makeTask('build-cdn-email-inline: ' + dirname, function() {
    return gulp.src('./src/email/mui-email-inline.scss')
      .pipe(plugins.sass({outputStyle: 'expanded'}))
      .pipe(plugins.rename('mui-email-inline.css'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnEmailStyletag(dirname) {
  return makeTask('build-cdn-email-styletag: ' + dirname, function() {
    return gulp.src('./src/email/mui-email-styletag.scss')
      .pipe(plugins.sass({outputStyle: 'expanded'}))
      .pipe(plugins.rename('mui-email-styletag.css'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnWebcomponents(dirname, cssdir) {
  return makeTask('build-cdn-webcomponents: ' + dirname, function() {
    return gulp.src('./build-targets/cdn-webcomponents.js')
      .pipe(plugins.browserify({
        transform: [stringify(['.css'])],
        paths: ['./', cssdir]
      }))
      .pipe(plugins.rename('mui-webcomponents.js'))
      .pipe(gulp.dest(dirname))
      .pipe(plugins.uglify())
      .pipe(plugins.rename('mui-webcomponents.min.js'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnColors(dirname) {
  return makeTask('build-cdn-colors: ' + dirname, function() {
    return gulp.src('./src/sass/mui-colors.scss')
      .pipe(plugins.sass({outputStyle: 'expanded'}))
      .pipe(plugins.cssmin())
      .pipe(plugins.rename('mui-colors.css'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnJsCombined(dirname, cssDir) {
  return makeTask('build-cdn-js-combined: ' + dirname, function() {
    return gulp.src('./build-targets/cdn-js-combined.js')
      .pipe(plugins.browserify({
        transform: [stringify(['.css'])],
        paths: ['./', cssDir]
      }))
      .pipe(plugins.uglify())
      .pipe(plugins.rename('mui-combined.js'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnReactCombined(dirname, cssDir) {
  var s = babelCore.buildExternalHelpers(reactBabelHelpers, 'global');

  return makeTask('build-cdn-react-combined: ' + dirname, function(done) {
    return gulp.src('./build-targets/cdn-react-combined.js')
      .pipe(plugins.browserify({
        transform: [
          babelify.configure({plugins: ['external-helpers-2']}),
          stringify(['.css'])
        ],
        paths: ['./', cssDir, './node_modules'],
        external: ['react'],
        extensions: ['.jsx']
      }))
      .pipe(plugins.replace("require('react')", "window.React"))
      .pipe(plugins.injectString.prepend(s))
      .pipe(plugins.uglify())
      .pipe(plugins.rename('mui-react-combined.js'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnAngularCombined(dirname, cssDir) {
  var s = babelCore.buildExternalHelpers(angularBabelHelpers, 'global');

  return makeTask('build-cdn-angular-combined: ' + dirname, function() {
    return gulp.src('./build-targets/cdn-angular-combined.js')
      .pipe(plugins.browserify({
        transform: [
          babelify.configure({plugins: ['external-helpers-2']}),
          stringify(['.css'])
        ],
        paths: ['./', './node_modules/', cssDir],
        external: ['angular']
      }))
      .pipe(plugins.replace("require('angular')", "window.angular"))
      .pipe(plugins.injectString.prepend(s))
      .pipe(plugins.ngmin())
      .pipe(plugins.uglify())
      .pipe(plugins.rename('mui-angular-combined.js'))
      .pipe(gulp.dest(dirname));
  });
}



// ----------------------------------------------------------------------------
// E2E-TESTS TASKS
// ----------------------------------------------------------------------------

function buildE2eTests() {
  var s = babelCore.buildExternalHelpers(reactBabelHelpers, 'global');

  return gulp.src('./build-targets/e2e-tests.js')
    .pipe(plugins.browserify({
      transform: [babelify.configure({plugins: ['external-helpers-2']})],
      extensions: ['.jsx']
    }))
    .pipe(plugins.injectString.prepend(s))
    .pipe(plugins.rename('tests.js'))
    .pipe(gulp.dest('./e2e-tests'));
}



// ----------------------------------------------------------------------------
// EXAMPLES TASKS
// ----------------------------------------------------------------------------

function buildExamples() {
  return gulp.series(
    buildCdn('./examples/assets/mui'),
    buildExamplesEmail
  );
}


function buildExamplesEmail() {
  return gulp.src('./examples/email/*.html')
    .pipe(plugins.inlineSource())
    .pipe(plugins.inlineCss({
      applyStyleTags: false,
      removeStyleTags: false
    }))
    .pipe(gulp.dest('./examples/email-inlined'));
}



// ----------------------------------------------------------------------------
// METEOR TASKS
// ----------------------------------------------------------------------------

function buildMeteor() {
  return gulp.parallel(
    buildCdnCss('./packages/meteor/lib/css'),
    buildCdnJs('./packages/meteor/lib/js')
  );
}


// ----------------------------------------------------------------------------
// NPM TASKS
// ----------------------------------------------------------------------------

function buildNpm() {
  var t1 = gulp.parallel(
    buildCdnCss('./packages/npm/lib/css'),
    buildNpmSass(),
    buildNpmJs(),
    buildNpmReact()
  );

  return gulp.series(
    t1,
    buildNpmReactBabelHelpers()
  );
}


function buildNpmSass() {
  return makeTask('build-npm-sass', function() {
    return gulp.src('./src/sass/**/*')
      .pipe(plugins.copy('./packages/npm/lib/sass', {prefix: 2}));
  });
}


function buildNpmJs() {
  return makeTask('build-npm-js', function() {
    return gulp.src([
      './src/js/config.js',
      './src/js/overlay.js',
      './src/js/lib/forms.js',
      './src/js/lib/jqLite.js',
      './src/js/lib/util.js'
    ])
      .pipe(plugins.copy('./packages/npm/lib/js', {prefix: 2}));
  });
}


function buildNpmReact() {
  return makeTask('build-npm-react', function() {
    var s = "var babelHelpers = require('./babel-helpers.js');\n";

    return gulp.src('./src/react/**/*')
      .pipe(plugins.babel({
        plugins: ['external-helpers-2']
      }))
      .pipe(plugins.injectString.prepend(s))
      .pipe(gulp.dest('./packages/npm/lib/react'));
  });
}


function buildNpmReactBabelHelpers() {
  return makeTask('build-npm-react-babel-helpers', function(done) {
    var s = babelCore.buildExternalHelpers(reactBabelHelpers, 'umd');
    fs.writeFileSync('./packages/npm/lib/react/babel-helpers.js', s);

    done();
  });
}
