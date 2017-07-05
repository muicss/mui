/**
 * MUI test angular appbar module
 * @module test/angular-tests/test-appbar
 */

import assert from 'assert';

let helpers = require('./angular-helper'),
    ngModule = helpers.module,
    inject = helpers.inject,
    jqLite = helpers.jqLite;

require('../../src/angular/appbar.js');


describe('angular/appbar', function() {
  let compile, scope;


  beforeEach(function() {
    ngModule('mui.appbar');
    inject(function($compile, $rootScope) {
      compile = $compile;
      scope = $rootScope.$new();
    });
  });


  afterEach(function() {
    scope.$destroy();
  });


  it('renders properly', function() {
    let wrapperEl = compile('<mui-appbar></mui-appbar>')(scope)[0];
    assert.equal(jqLite.hasClass(wrapperEl, 'mui-appbar'), true);
  });
});
