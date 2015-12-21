/**
 * MUI gulp file
 */

var autoprefixer = require('gulp-autoprefixer'),
    babelify = require('babelify'),
    babelCore = require('babel-core'),
    browserify = require('gulp-browserify'),
    Browserify = require('browserify'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    del = require('del'),
    fs = require('fs'),
    gulp = require('gulp'),
    injectSource = require('gulp-inline-source'),
    injectString = require('gulp-inject-string'),
    inlineCss = require('gulp-inline-css'),
    jshint = require('gulp-jshint'),
    libSass = require('gulp-sass'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    source = require('vinyl-source-stream'),
    streamqueue = require('streamqueue'),
    stringify = require('stringify'),
    uglify = require('gulp-uglify');


babelify = babelify.configure({
  plugins: ['external-helpers-2']
})


var babelHelpersJS = babelCore.buildExternalHelpers(
  [
    'inherits',
    'createClass',
    'classCallCheck',
    'possibleConstructorReturn',
    'interopRequireDefault',
    'interopRequireWildcard',
    'extends'
  ],
  'global'
);



// ============================================================================
// CONFIG
// ============================================================================

var taskName = process.argv[process.argv.length - 1],
    pkgName = 'mui',
    dirName = null;

if (taskName === 'build-dist') {
  dirName = 'dist';
} else if (taskName === 'build-examples' || taskName === 'watch') {
  dirName = 'examples/assets/' + pkgName;
} else if (taskName !== 'build-e2e-tests') {
  throw 'Did not understand task "' + taskName + '"';
}




// ============================================================================
// RECIPES
// ============================================================================

gulp.task('clean', function() {
  return del([dirName]);
});



// ----------------------------------------------------------------------------
// CSS
// ----------------------------------------------------------------------------

gulp.task('sass', function() {
  return gulp.src('src/sass/mui.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .on('error', function(err) {console.log(err.message);})
    .pipe(rename(pkgName + '.css'))
    .pipe(gulp.dest(dirName + '/css'));
});


gulp.task('cssmin', ['sass'], function() {
  return gulp.src(dirName + '/css/' + pkgName + '.css')
    .pipe(cssmin({advanced: false}))
    .pipe(rename(pkgName + '.min.css'))
    .pipe(gulp.dest(dirName + '/css'));
});



// ----------------------------------------------------------------------------
// JS
// ----------------------------------------------------------------------------

gulp.task('js', function() {
  return Browserify('./src/js/mui.js')
    .bundle()
    .pipe(source(pkgName + '.js'))
    .pipe(gulp.dest(dirName + '/js'));
});


gulp.task('uglify', ['js'], function() {
  return gulp.src(dirName + '/js/' + pkgName + '.js')
    .pipe(uglify())
    .pipe(rename(pkgName + '.min.js'))
    .pipe(gulp.dest(dirName + '/js'));  
});



// ----------------------------------------------------------------------------
// REACT
// ----------------------------------------------------------------------------

gulp.task('react', ['clean'], function() {
  return gulp.src('src/react/mui.js')
    .pipe(browserify({
      transform: [babelify],
      external: ['react']
    }))
    .pipe(replace("require('react')", "window.React"))
    .pipe(injectString.prepend(babelHelpersJS))
    .pipe(rename(pkgName + '-react.js'))
    .pipe(gulp.dest(dirName + '/react'));
});


gulp.task('react-uglify', ['react'], function() {
  return gulp.src(dirName + '/react/' + pkgName + '-react.js')
    .pipe(uglify())
    .pipe(rename(pkgName + '-react.min.js'))
    .pipe(gulp.dest(dirName + '/react'));  
});



// ----------------------------------------------------------------------------
// WEB COMPONENTS
// ----------------------------------------------------------------------------

gulp.task('webcomponents', ['clean', 'cssmin'], function() {
  return gulp.src('src/webcomponents/main.js')
    .pipe(browserify({
      transform: [stringify(['.css'])],
      paths: [dirName + '/css']
    }))
    .pipe(rename(pkgName + '-webcomponents.js'))
    .pipe(gulp.dest(dirName + '/webcomponents'));
});


gulp.task('webcomponents-uglify', ['webcomponents'], function() {
  return gulp.src(dirName + '/webcomponents/' + pkgName + '-webcomponents.js')
    .pipe(uglify())
    .pipe(rename(pkgName + '-webcomponents.min.js'))
    .pipe(gulp.dest(dirName + '/webcomponents'));
});



// ----------------------------------------------------------------------------
// EMAIL
// ----------------------------------------------------------------------------

gulp.task('build-email-inline', function() {
  return gulp.src('src/email/mui-email-inline.scss')
    .pipe(sass())
    .pipe(rename(pkgName + '-email-inline.css'))
    .pipe(gulp.dest(dirName + '/email'));
});


gulp.task('build-email-styletag', function() {
  return gulp.src('src/email/mui-email-styletag.scss')
    .pipe(sass())
    .pipe(rename(pkgName + '-email-styletag.css'))
    .pipe(gulp.dest(dirName + '/email'));
});


gulp.task('clean-email-inlined', function() {
  return del(['examples/email-inlined'])
});


gulp.task('copy-example-emails', ['clean-email-inlined'], function() {
  return gulp.src('examples/email/*.html')
    .pipe(gulp.dest('examples/email-inlined/'));
});


gulp.task(
  'process-inlined-emails-1',
  ['copy-example-emails', 'build-email-styletag'],
  function() {
    // inject contents of mui-email-styletag.css in to <head>
    return gulp.src('examples/email-inlined/*.html')
      .pipe(injectSource())
      .pipe(gulp.dest('examples/email-inlined/'));
  }
);


gulp.task(
  'process-inlined-emails-2',
  ['process-inlined-emails-1', 'build-email-styletag'],
  function() {
    // inline contents of mui-email-inline.css into <body>
    return gulp.src('examples/email-inlined/*.html')
      .pipe(inlineCss({
        applyStyleTags: false,
        removeStyleTags: false
      }))
      .pipe(gulp.dest('examples/email-inlined/'));
  }
);



// ----------------------------------------------------------------------------
// EXTRA
// ----------------------------------------------------------------------------

gulp.task('colors', function() {
  return gulp.src('src/sass/mui-colors.scss')
    .pipe(sass())
    .pipe(cssmin())
    .pipe(rename(pkgName + '-colors.css'))
    .pipe(gulp.dest(dirName + '/extra'));
});


gulp.task('cssjs-combined', ['clean', 'cssmin'], function() {
  return gulp.src('src/js/mui-combined.js')
    .pipe(browserify({
      transform: [stringify(['.css'])],
      paths: [dirName + '/css']
    }))
    .pipe(uglify())
    .pipe(rename(pkgName + '-combined.js'))
    .pipe(gulp.dest(dirName + '/extra'));
});


gulp.task('react-combined', ['clean', 'cssmin'], function() {
  return gulp.src('src/react/mui-combined.js')
    .pipe(browserify({
      transform: [
        babelify,
        stringify(['.css'])
      ],
      paths: [dirName + '/css'],
      exclude: ['react']
    }))
    .pipe(injectString.prepend(babelHelpersJS))
    .pipe(uglify())
    .pipe(rename(pkgName + '-react-combined.js'))
    .pipe(gulp.dest(dirName + '/extra'));
});




// ============================================================================
// UTILITY METHODS
// ============================================================================

function sass() {
  return libSass({
    'outputStyle': 'expanded'
  });
}


function build(options) {
  options = options || {};
  
  var tasks = [
    'sass',
    'cssmin',
    'js',
    'uglify',
    'react',
    'react-uglify',
    'webcomponents',
    'webcomponents-uglify',
    'build-email-inline',
    'build-email-styletag',
    'colors',
    'cssjs-combined',
    'react-combined'
  ];

  if (options.emailInlined) {
    tasks.push('process-inlined-emails-1');
    tasks.push('process-inlined-emails-2');
  }
  
  gulp.start(tasks);
}




// ============================================================================
// PUBLIC TASKS
// ============================================================================

gulp.task('build-dist', ['clean'], function() {
  build();
});


gulp.task('build-examples', ['clean'], function() {
  build({emailInlined: true});
});


gulp.task('build-e2e-tests', function() {
  return gulp.src('e2e-tests/_tests.js')
    .pipe(browserify({
      transform: [babelify]
    }))
    .pipe(injectString.prepend(babelHelpersJS))
    .pipe(rename('tests.js'))
    .pipe(gulp.dest('e2e-tests'));
});


gulp.task('watch', function() {
  // sass
  gulp.watch('src/sass/**/*.scss',
             {interval: 1500},
             ['sass', 'cssmin', 'email']);

  // js
  gulp.watch('src/js/**/*.js',
             {interval: 1500},
             ['js',
              'uglify',
              'react',
              'react-uglify',
              'webcomponents',
              'webcomponents-uglify',
              'build-e2e-tests']);

  // react
  gulp.watch(['src/react/**/*.jsx', 'src/react/**/*.js'],
             {interval: 1500},
             ['react', 'react-uglify']);

  // webcomponents
  gulp.watch(['src/webcomponents/**/*.jsx', 'src/webcomponents/**/*.js'],
             {interval: 1500},
             ['webcomponents', 'webcomponents-uglify']);

  // test files
  gulp.watch('test/**/.js',
             {interval: 1500},
             ['build-e2e-tests']);
});
