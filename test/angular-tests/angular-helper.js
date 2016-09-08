global.window.mocha = {}; //angular-mocks.js line 2287.
global.window.beforeEach = beforeEach;
global.window.afterEach = afterEach;
global.Node = window.Node; //angular need

// Since angular and angular-mocks are both singletons created once with one 
// window-object and mocha doesn't reload modules from node_modules on watch
// mode we'll have to invalidate the cached singletons manually.
delete require.cache[require.resolve('angular')];
delete require.cache[require.resolve('angular/angular')];
delete require.cache[require.resolve('angular-mocks')];

require('angular/angular');
require('angular-mocks');

global.angular = window.angular;

// import jqLite
let jqLite = require('../../src/js/lib/jqLite');

module.exports = {
  inject: window.angular.mock.inject,
  module: window.angular.mock.module,
  jqLite: jqLite
};
