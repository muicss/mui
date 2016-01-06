/**
 * MUI Test Util library
 * @module test/cssjs-tests/test-util
 */

var assert = require('assert');

var util = require('../../src/js/lib/util.js');


describe('js/lib/util.js', function() {
  var el;


  beforeEach(function() {
    el = document.createElement('div');
    document.body.appendChild(el);
  });


  afterEach(function() {
    el.parentNode.removeChild(el);
  });


  // --------------------------------------------------------------------------
  // LOADSTYLE
  // --------------------------------------------------------------------------

  it('should load styles dynamically', function() {
    var s = '.my-class {color: rgb(255, 0, 0);}';
    util.loadStyle(s);

    el.className = 'my-class';

    var css = getComputedStyle(el);
    assert.equal(css.getPropertyValue('color'), 'rgb(255, 0, 0)');
  });
});
