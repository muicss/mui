'use strict';


var babelCore = require('babel-core'),
    gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();


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


gulp.task('watch', function() {
  gulp.watch('./src/**/*', gulp.parallel(
    'examples:build',
    'e2e-tests:build'
  ));
});



// ============================================================================
// PRIVATE TASKS
// ============================================================================

var babelify = require('babelify'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    del = require('del'),
    fs = require('fs'),
    mergeStream = require('merge-stream'),
    source = require('vinyl-source-stream'),
    stringify = require('stringify');


function makeTask(displayName, fn) {
  if (displayName) fn.displayName = displayName;
  return fn;
}


function clean(dirname) {
  return makeTask('clean: ' + dirname, function(done) {
    return del(dirname, done);
  });
}


function browserifyStream(pathname, opts) {
  var opts = opts || {};

  // init browserify
  var b = browserify({
    entries: [pathname],
    paths: ['./'].concat(opts.paths || []),
    extensions: [].concat(opts.extensions || [])
  });
  
  // apply methods
  ['external', 'transform'].forEach(function(method) {
    if (!opts[method]) return;

    [].concat(opts[method]).forEach(function(args) {
      b[method].apply(b, [].concat(args));
    });
  });

  // return stream
  return b
    .bundle()
    .pipe(source('tmpfile'))
    .pipe(buffer());
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
    buildCdnColors(dirname + '/extra'),
    buildCdnNoGlobals(dirname + '/extra'),
    buildCdnPx(dirname + '/extra'),
    buildCdnRem(dirname + '/extra')
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
    return cssStream('mui.scss', dirname);
  });
}


function buildCdnJs(dirname) {
  return makeTask('build-cdn-js: ' + dirname, function() {
    return browserifyStream('./build-targets/cdn-js.js')
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
    return browserifyStream(
      './build-targets/cdn-react.js',
      {
        extensions: ['.jsx'],
        external: ['react'],
        transform: [babelify.configure({plugins: ['external-helpers']})]
      })
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
    return browserifyStream(
      './build-targets/cdn-angular.js',
      {
        external: ['angular'],
        transform: [babelify.configure({plugins: ['external-helpers']})]
      })
      .pipe(plugins.replace("require('angular')", "window.angular"))
      .pipe(plugins.injectString.prepend(s))
      .pipe(plugins.concat('mui-angular.js'))
      .pipe(gulp.dest(dirname))
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.uglify())
      .pipe(plugins.rename('mui-angular.min.js'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnEmailInline(dirname) {
  return makeTask('build-cdn-email-inline: ' + dirname, function() {
    // handles ltr and rtl directions
    return gulp.src('./src/email/mui-email-inline.scss')
      .pipe(plugins.sass({outputStyle: 'expanded'}))
      .pipe(plugins.rename('mui-email-inline.css'))
      .pipe(gulp.dest(dirname))
      .pipe(plugins.rtlcss())
      .pipe(plugins.replace(/mui--divider-(left|right)/g, function(match) {
        // switch right and left
        if (match.endsWith('-left')) return match.replace('left', 'right')
        else return match.replace('right', 'left');
      }))
      .pipe(plugins.injectString.append('html,body,.mui-body{direction:rtl;}'))
      .pipe(plugins.rename('mui-email-inline-rtl.css'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnEmailStyletag(dirname) {
  return makeTask('build-cdn-email-styletag: ' + dirname, function() {
    // ltr and rtl
    return gulp.src('./src/email/mui-email-styletag.scss')
      .pipe(plugins.sass({outputStyle: 'expanded'}))
      .pipe(plugins.rename('mui-email-styletag.css'))
      .pipe(gulp.dest(dirname))
      .pipe(plugins.rtlcss())
      .pipe(plugins.rename('mui-email-styletag-rtl.css'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnWebcomponents(dirname, cssdir) {
  return makeTask('build-cdn-webcomponents: ' + dirname, function() {
    return browserifyStream(
      './build-targets/cdn-webcomponents.js',
      {
        paths: [cssdir],
        transform: [stringify(['.css'])]
      })
      .pipe(plugins.rename('mui-webcomponents.js'))
      .pipe(gulp.dest(dirname))
      .pipe(plugins.uglify({output: {max_line_len: null}}))
      .pipe(plugins.rename('mui-webcomponents.min.js'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnColors(dirname) {
  return makeTask('build-cdn-colors: ' + dirname, function() {
    return gulp.src('./src/sass/mui-colors.scss')
      .pipe(plugins.sass({outputStyle: 'expanded'}))
      .pipe(plugins.rename('mui-colors.css'))
      .pipe(gulp.dest(dirname))
      .pipe(plugins.cssmin())
      .pipe(plugins.rename('mui-colors.min.css'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnNoGlobals(dirname) {
  return makeTask('build-cdn-noglobals: ' + dirname, function() {
    return cssStream('mui-noglobals.scss', dirname);
  });
}


function buildCdnPx(dirname) {
  return makeTask('build-cdn-px: ' + dirname, function() {
    return cssStream('mui-px.scss', dirname);
  });
}


function buildCdnRem(dirname) {
  return makeTask('build-cdn-rem: ' + dirname, function() {
    return cssStream('mui-rem.scss', dirname);
  });
}


function buildCdnJsCombined(dirname, cssDir) {
  return makeTask('build-cdn-js-combined: ' + dirname, function() {
    return browserifyStream(
      './build-targets/cdn-js-combined.js',
      {
        paths: [cssDir],
        transform: [stringify(['.css'])]
      })
      .pipe(plugins.rename('mui-combined.js'))
      .pipe(gulp.dest(dirname))
      .pipe(plugins.uglify({output: {max_line_len: null}}))
      .pipe(plugins.rename('mui-combined.min.js'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnReactCombined(dirname, cssDir) {
  var s = babelCore.buildExternalHelpers(reactBabelHelpers, 'global');

  return makeTask('build-cdn-react-combined: ' + dirname, function(done) {
    return browserifyStream(
      './build-targets/cdn-react-combined.js',
      {
        paths: [cssDir],
        extensions: ['.jsx'],
        external: ['react'],
        transform: [
          babelify.configure({plugins: ['external-helpers']}),
          stringify(['.css'])
        ]
      })
      .pipe(plugins.replace("require('react')", "window.React"))
      .pipe(plugins.injectString.prepend(s))
      .pipe(plugins.rename('mui-react-combined.js'))
      .pipe(gulp.dest(dirname))
      .pipe(plugins.uglify({output: {max_line_len: null}}))
      .pipe(plugins.rename('mui-react-combined.min.js'))
      .pipe(gulp.dest(dirname));
  });
}


function buildCdnAngularCombined(dirname, cssDir) {
  var s = babelCore.buildExternalHelpers(angularBabelHelpers, 'global');

  return makeTask('build-cdn-angular-combined: ' + dirname, function() {
    return browserifyStream(
      './build-targets/cdn-angular-combined.js',
      {
        paths: [cssDir],
        external: ['angular'],
        transform: [
          babelify.configure({plugins: ['external-helpers']}),
          stringify(['.css'])
        ]
      })
      .pipe(plugins.replace("require('angular')", "window.angular"))
      .pipe(plugins.injectString.prepend(s))
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.rename('mui-angular-combined.js'))
      .pipe(gulp.dest(dirname))
      .pipe(plugins.uglify({output: {max_line_len: null}}))
      .pipe(plugins.rename('mui-angular-combined.min.js'))
      .pipe(gulp.dest(dirname));
  });
}



// ----------------------------------------------------------------------------
// E2E-TESTS TASKS
// ----------------------------------------------------------------------------

function buildE2eTests() {
  var s = babelCore.buildExternalHelpers(reactBabelHelpers, 'global');

  return browserifyStream(
    './build-targets/e2e-tests.js',
    {
      extensions: ['.jsx'],
      transform: [babelify.configure({plugins: ['external-helpers']})],
    })
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
    buildCdn('./packages/npm/dist'),
    buildNpmSass(),
    buildNpmEmail(),
    buildNpmJs(),
    buildNpmReact(),
    buildNpmAngular()
  );

  return gulp.series(
    t1,
    buildNpmBabelHelpersReact(),
    buildNpmBabelHelpersAngular()
  );
}


function buildNpmSass() {
  return makeTask('build-npm-sass', function() {
    return gulp.src('./src/sass/**/*')
      .pipe(plugins.copy('./packages/npm/lib/sass', {prefix: 2}));
  });
}


function buildNpmEmail() {
  return makeTask('build-npm-email', function() {
    return gulp.src('./src/email/**/*')
      .pipe(plugins.copy('./packages/npm/lib/email', {prefix: 2}));
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
        plugins: ['external-helpers']
      }))
      .pipe(plugins.injectString.prepend(s))
      .pipe(gulp.dest('./packages/npm/lib/react'));
  });
}


function buildNpmAngular() {
  return makeTask('build-npm-angular', function() {
    var s = "var babelHelpers = require('./babel-helpers.js');\n";

    return gulp.src('./src/angular/**/*')
      .pipe(plugins.babel({
        plugins: ['external-helpers']
      }))
      .pipe(plugins.injectString.prepend(s))
      .pipe(gulp.dest('./packages/npm/lib/angular'));
  });
}


function buildNpmBabelHelpersReact() {
  return makeTask('build-npm-react-babel-helpers', function(done) {
    var s = babelCore.buildExternalHelpers(reactBabelHelpers, 'umd');
    fs.writeFileSync('./packages/npm/lib/react/babel-helpers.js', s);

    done();
  });
}


function buildNpmBabelHelpersAngular() {
  return makeTask('build-npm-angular-babel-helpers', function(done) {
    var s = babelCore.buildExternalHelpers(angularBabelHelpers, 'umd');
    fs.writeFileSync('./packages/npm/lib/angular/babel-helpers.js', s);

    done();
  });
}



// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------

function cssStream(filename, dirname) {
  var basename = filename.split('.')[0],
      rtlGlobalStr = 'html,body{direction:rtl;}';
  
  if (filename.indexOf('noglobals') >= 0) rtlGlobalStr = '';

  // base stream
  var baseStream = gulp.src('./src/sass/' + filename)
    .pipe(plugins.sass({outputStyle: 'expanded'}))
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .on('error', function(err) {console.log(err.message);})
    .pipe(plugins.rename(basename + '.css'))
    .pipe(gulp.dest(dirname));
  
  // left-to-right
  var stream1 = baseStream
    .pipe(plugins.cssmin({advanced: false}))
    .pipe(plugins.rename(basename + '.min.css'))
    .pipe(gulp.dest(dirname));
  
  // right-to-left
  var stream2 = baseStream
    .pipe(plugins.rtlcss())
    .pipe(plugins.replace(/mui--divider-(left|right)/g, function(match) {
      // switch right and left
      if (match.endsWith('-left')) return match.replace('left', 'right')
      else return match.replace('right', 'left');
    }))
    .pipe(plugins.injectString.append(rtlGlobalStr))
    .pipe(plugins.rename(basename + '-rtl.css'))
    .pipe(gulp.dest(dirname))
    .pipe(plugins.cssmin({advanced: false}))
    .pipe(plugins.rename(basename + '-rtl.min.css'))
    .pipe(gulp.dest(dirname));
  
  return mergeStream(stream1, stream2);
}
