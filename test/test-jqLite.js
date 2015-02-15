describe('js/lib/jqLite.js', function() {
  var assert = require('assert'),
      helpers = require('./helpers.js'),
      jqLite;

  helpers.initDOM();

  before(function() {
    jqLite = require('../src/js/lib/jqLite.js');
  });
  
  // ----------------------
  // class methods
  // ----------------------
  describe('class methods', function() {
    var el;

    beforeEach(function() {
      el = document.createElement('div');
    });
    
    it('should add a class', function() {
      jqLite.addClass(el, 'my-class');
      assert.equal(jqLite.hasClass(el, 'my-class'), true);
    });

    it('should remove a class', function() {
      jqLite.addClass(el, 'my-class');
      jqLite.removeClass(el, 'my-class');
      assert.equal(jqLite.hasClass(el, 'my-class'), false);
    });

    it('should only add one class', function() {
      jqLite.addClass(el, 'my-class');
      jqLite.addClass(el, 'my-class');
      assert.equal(el.className, 'my-class');
    });

    it('should remove all classes', function() {
      el.className = 'my-class my-class';
      jqLite.removeClass(el, 'my-class');
      assert.equal(jqLite.hasClass(el, 'my-class'), false);
    });
  });

  // --------------------
  // event handlers
  // --------------------
  describe('event handlers', function() {
    var event, el;

    before(function() {
      event = require('synthetic-dom-events');
    });
    
    beforeEach(function() {
      el = document.createElement('button');
    });

    it('should attach an listener', function() {
      var isClicked = false;
      jqLite.on(el, 'click', function() {
        isClicked = true;
      });
      el.dispatchEvent(event('click'));
      assert.equal(isClicked, true);
    });

    it('should remove a listener', function() {
      var trigger1 = false,
          trigger2 = false;

      function fn1() {trigger1 = true;};
      function fn2() {trigger2 = true;};
      
      // add both
      jqLite.on(el, 'click', fn1);
      jqLite.on(el, 'click', fn2);
      
      // remove one
      jqLite.off(el, 'click', fn2);

      // trigger and check
      el.dispatchEvent(event('click'));
      assert.equal(trigger1, true);
      assert.equal(trigger2, false);
    });

    it('should remove all listeners', function() {
      var trigger1 = false,
          trigger2 = false;

      function fn1() {trigger1 = true;};
      function fn2() {trigger2 = true;};
      
      // add both
      jqLite.on(el, 'click', fn1);
      jqLite.on(el, 'click', fn2);
      
      // remove one
      jqLite.off(el, 'click');

      // trigger and check
      el.dispatchEvent(event('click'));
      assert.equal(trigger1, false);
      assert.equal(trigger2, false);
    });
  });

  // --------------------
  // css helper
  // --------------------
  describe('css helpers', function() {
    var el;

    beforeEach(function() {
      el = document.createElement('button');
      document.body.appendChild(el);
    });

    afterEach(function() {
      el.parentNode.removeChild(el);
    });

    it('should set individual values', function() {
      jqLite.css(el, 'background-color', 'red');
      assert.equal(el.style.backgroundColor, 'red')
    });

    it('should set multiple values', function() {
      jqLite.css(el, {
        'background-color': 'red',
        'color': 'blue'
      });
      assert.equal(el.style.backgroundColor, 'red');
      assert.equal(el.style.color, 'blue');
    });

    it('should get individual classes', function() {
      jqLite.css(el, 'background-color', 'rgb(255, 0, 0)');
      assert.equal(jqLite.css(el, 'background-color'), 'rgb(255, 0, 0)');
    });

    // TODO: specify missing values API
  });
});
