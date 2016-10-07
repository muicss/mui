/**
 * jqLite Tests
 * @module test/cssjs-tests/test-jqLite
 */

var assert = require('assert');
  
var jqLite = require('../../src/js/lib/jqLite.js');


describe('js/lib/jqLite.js', function() {

  // --------------------------------------------------------------------------
  // CLASS METHODS
  // --------------------------------------------------------------------------

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

  

  // --------------------------------------------------------------------------
  // EVENT HANDLERS
  // --------------------------------------------------------------------------

  describe('event handlers', function() {
    var event, el;


    before(function() {
      event = require('synthetic-dom-events');
    });

    
    beforeEach(function() {
      el = document.createElement('button');
      document.body.appendChild(el);  // for IE10
    });


    afterEach(function() {
      el.parentNode.removeChild(el);
    });

    
    it('should attach a listener', function() {
      var isClicked = false;
      jqLite.on(el, 'click', function() {
        isClicked = true;
      });
      el.dispatchEvent(event('click'));
      assert.equal(isClicked, true);
    });


    it('should attach multiple listeners', function() {
      var numEvs = 0;
      jqLite.on(el, 'click touchstart', function() {
        numEvs += 1;
      });
      el.dispatchEvent(event('click'));
      el.dispatchEvent(event('touchstart'));
      assert.equal(numEvs, 2);
    });


    it('should remove a listener', function() {
      var trigger1 = false,
          trigger2 = false;

      var fn1 = function() {trigger1 = true;};
      var fn2 = function() {trigger2 = true;};
      
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


    it('should remove multiple listeners', function() {
      var trigger = false,
          fn = function() {trigger = true;};
      
      // add both
      jqLite.on(el, 'click touchstart', fn);
      
      // remove both
      jqLite.off(el, 'touchstart click', fn);

      // trigger first
      el.dispatchEvent(event('click'));
      assert.equal(trigger, false);

      // trigger second
      el.dispatchEvent(event('touchstart'));
      assert.equal(trigger, false);
    });


    it('should remove all listeners', function() {
      var trigger1 = false,
          trigger2 = false;

      var fn1 = function() {trigger1 = true;};
      var fn2 = function() {trigger2 = true;};
      
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


    it('should only trigger once', function() {
      var t = 0,
          fn = function() {t += 1;};
      
      jqLite.one(el, 'click', fn);

      // trigger once
      el.dispatchEvent(event('click'));
      assert.equal(t, 1);

      // trigger again
      el.dispatchEvent(event('click'));
      assert.equal(t, 1);
    });


    it('should only trigger once with useCapture', function() {
      var t = 0,
          fn = function() {t += 1;};
      
      jqLite.one(el, 'click', fn, true);

      // trigger once
      el.dispatchEvent(event('click'));
      assert.equal(t, 1);

      // trigger again
      el.dispatchEvent(event('click'));
      assert.equal(t, 1);
    });


    it('should only trigger once per event', function() {
      var events = [],
          fn;

      fn = function(ev) {
        events.push(ev.type);
      }
      
      jqLite.one(el, 'click touchstart', fn);

      // trigger once
      el.dispatchEvent(event('click'));
      el.dispatchEvent(event('click'));
      el.dispatchEvent(event('touchstart'));
      el.dispatchEvent(event('touchstart'));

      // check triggers
      assert.equal(events.length, 2);
      assert.equal(events[0], 'click');
      assert.equal(events[1], 'touchstart');
    });
  });


  
  // --------------------------------------------------------------------------
  // CSS HELPER
  // --------------------------------------------------------------------------

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



  // --------------------------------------------------------------------------
  // SCROLL METHODS
  // --------------------------------------------------------------------------
  describe('scroll methods', function() {
    var el;


    beforeEach(function() {
      el = document.createElement('div');
      document.body.appendChild(el);
    });
    

    afterEach(function() {
      el.parentNode.removeChild(el);
    });


    it('should set scroll position', function() {
      var innerEl = document.createElement('div');
      el.appendChild(innerEl);

      // add overflow
      jqLite.css(innerEl, {
        'height': '100px',
        'width': '100px',
        'background-color': 'red'
      });

      jqLite.css(el, {
        'height': '50px',
        'width': '50px',
        'overflow': 'auto'
      });

      // scroll
      jqLite.scrollTop(el, 25);
      assert.equal(jqLite.scrollTop(el), 25);

      jqLite.scrollLeft(el, 30);
      assert.equal(jqLite.scrollLeft(el), 30);
    });
  });
});
