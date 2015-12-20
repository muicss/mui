/**
 * MUI Test Util library
 * @module test/cssjs-tests/test-util
 */


describe('js/lib/util.js', () => {
  let assert = require('assert'),
      helpers = require('../lib/helpers.js'),
      util,
      el;

  helpers.initDOM();

  
  before(() => {
    util = require('../../src/js/lib/util.js');
  });


  beforeEach(() => {
    el = document.createElement('div');
    document.body.appendChild(el);
  });


  afterEach(() => {
    el.parentNode.removeChild(el);
  });


  // --------------------------------------------------------------------------
  // LOADSTYLE
  // --------------------------------------------------------------------------

  it('should load styles dynamically', () => {
    const s = '.my-class {color: rgb(255, 0, 0);}';
    util.loadStyle(s);

    el.className = 'my-class';

    let css = getComputedStyle(el);
    assert.equal(css.getPropertyValue('color'), 'rgb(255, 0, 0)');
  });
});
