describe('js/lib/util.js', function() {
  var assert = require('assert'),
      helpers = require('./helpers.js'),
      util,
      el;

  helpers.initDOM();
  
  before(function() {
    util = require('../src/js/lib/util.js');
  });

  beforeEach(function() {
    el = document.createElement('div');
    document.body.appendChild(el);
  });

  afterEach(function() {
    el.parentNode.removeChild(el);
  });

  // ----------------------
  // loadStyle
  // ----------------------
  it('should load styles dynamically', function() {
    var s = '.my-class {color: rgb(255, 0, 0);}';
    util.loadStyle(s);

    el.className = 'my-class';

    var css = getComputedStyle(el);
    assert.equal(css.getPropertyValue('color'), 'rgb(255, 0, 0)');
  });
});
