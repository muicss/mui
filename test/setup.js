// initialize jsdom (skipWindowCheck is due to before-compilers.js)
require('mocha-jsdom')({skipWindowCheck: true});

// add angular to global environment
// TODO: reset jsdom before/after each test
before(function() {
  require('angular/angular');
  require('angular-mocks');

  // make 'angular' available to global context without `window.angular`
  global.angular = window.angular;
});
