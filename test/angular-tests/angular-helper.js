delete require.cache[require.resolve('angular')];
delete require.cache[require.resolve('angular/angular')];
delete require.cache[require.resolve('angular-mocks')];

global.window.mocha = {}; //angular-mocks.js line 2287.
global.window.beforeEach = beforeEach;
global.window.afterEach = afterEach;
global.Node = window.Node; //angular need

require('angular/angular');
require('angular-mocks');

global.angular = window.angular;

let jqLite = require('../../src/js/lib/jqLite'),
    util = require('../../src/js/lib/util');

module.exports = {
  inject: angular.mock.inject,
  module: angular.mock.module,
  jqLite: jqLite,
  util: util
};
