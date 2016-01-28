/**
 * MUI test angular appbar module
 * @module test/angular-tests/test-appbar
 */

import assert from 'assert';


describe('angular/appbar', function() {

  before(function() {
    require('../../src/angular/appbar.js');
    angular.module('mui.appbar');
  });


  it('test1', function() {
    assert(true, true);
  });
});
