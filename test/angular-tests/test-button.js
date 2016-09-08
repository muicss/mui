/**
 * MUI test angular button module
 * @module test/angular-tests/test-button
 */

import assert from 'assert';

let helpers = require('./angular-helper'),
    ngModule = helpers.module,
    inject = helpers.inject,
    jqLite = helpers.jqLite;

require('../../src/angular/button.js');


describe('angular/button', function() {
  let compile, scope;


  beforeEach(function() {
    ngModule('mui.button');
    inject(function($compile, $rootScope) {
      compile = $compile;
      scope = $rootScope.$new();
    });
  });


  afterEach(function() {
    scope.$destroy();
  });


  it('renders properly', function() {
    let buttonEl = compile('<mui-button>test</mui-button>')(scope)[0];
    assert.equal(buttonEl.tagName, 'BUTTON');
    assert.equal(jqLite.hasClass(buttonEl, 'mui-btn'), true);
  });


  it('renders type attribute', function() {
    let s = '<mui-button type="button">test</mui-button>';
    let element = compile(s)(scope);
    assert.equal(element.attr('type'), 'button');
  });
});
