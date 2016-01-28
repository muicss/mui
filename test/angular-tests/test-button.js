/**
 * MUI test angular appbar module
 * @module test/angular-tests/test-appbar
 */

import assert from 'assert';


describe('angular/button', function() {

  before(function() {
    require('../../src/angular/button.js');
    angular.module('mui.button');
  });


  it('test1', function() {
    assert(true, true);
  });
});
