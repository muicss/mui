/**
 * MUI test angular appbar module
 * @module test/angular-tests/test-appbar
 */

import assert from 'assert';

var helpers = require('./angular-helper');
var ngModule = helpers.module;
var inject = helpers.inject;
require('../../src/angular/appbar.js');

var compile, scope, directiveElem;

describe('angular/appbar', function() {
  beforeEach(function() {
    ngModule('mui.appbar');
    inject(function($compile, $rootScope){
      compile = $compile;
      scope = $rootScope.$new();
    });
  });

  afterEach(function () {
    scope.$destroy();
  });

  it('renders properly', function() {
    //appbar directive with attribute ```replace: true```.
    var compiled = compile('<mui-appbar></mui-appbar>')(scope);

    assert.equal(!!~compiled.attr('class').indexOf('mui-appbar'), true);
  });
});
